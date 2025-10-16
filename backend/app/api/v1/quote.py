from typing import Annotated

from fastapi import APIRouter, Depends, Query, HTTPException, status


from app.api.deps import CurrentUserDep, SessionDep
from app.app.quote.application import QuoteService
from app.app.quote.infraestructure.postgres import SQLModelQuoteRepository
from app.app.quote.dtos import CreateQuote, UpdateQuote, PublicQuote


def get_quote_service(db: SessionDep) -> QuoteService:
    return QuoteService(SQLModelQuoteRepository(db))


ServiceDep = Annotated[QuoteService, Depends(get_quote_service)]

router = APIRouter(tags=["quotes"])


@router.post("/", response_model=PublicQuote)
def register_quote(
    current_user: CurrentUserDep, service: ServiceDep, quote: CreateQuote
):
    return service.register_quote(quote)


@router.get("/", response_model=list[PublicQuote])
def get_my_quotes(
    current_user: CurrentUserDep,
    service: ServiceDep,
    limit: Annotated[int, Query(gt=0, le=50)] = 10,
    offset: Annotated[int, Query(ge=0)] = 0,
):
    return service.get_quotes_by_user_id(current_user.id_user, limit, offset)


@router.get("/book/{id_book}", response_model=list[PublicQuote])
def get_quotes_by_book_id(
    current_user: CurrentUserDep, service: ServiceDep, id_book: int
):
    return service.get_quotes_by_book_id(id_book)


@router.get("/{id_quote}", response_model=PublicQuote)
def get_quote_by_id(current_user: CurrentUserDep, service: ServiceDep, id_quote: int):
    return service.get_quote_by_id(id_quote)


@router.get("/random", response_model=PublicQuote)
def get_random_quote(current_user: CurrentUserDep, service: ServiceDep):
    return service.get_random_quote_by_user_id(current_user.id_user)


@router.put("/", response_model=PublicQuote)
def update_quote(current_user: CurrentUserDep, service: ServiceDep, quote: UpdateQuote):
    return service.update_quote(quote, current_user.id_user)


@router.delete("/{id_quote}", status_code=200)
def delete_quote(current_user: CurrentUserDep, service: ServiceDep, id_quote: int):
    result = service.delete_quote(id_quote, current_user.id_user)
    if not result:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="Error deleting quote"
        )
    return {"detail": "Quote deleted successfully"}
