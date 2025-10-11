from typing import Annotated

from fastapi import APIRouter, Depends, Query

from app.api.deps import SessionDep, CurrentUserDep
from app.app.book.application import BookService
from app.app.book.dtos import (
    BookCreate,
    BookUpdate,
    PublicBook,
    PublicBookWithDescription,
    BookDescCreate,
    BookDescUpdate,
    PublicBookDescription,
)
from app.app.book.infraestructure.postgres import SQLModelBookRepository


def get_book_service(db: SessionDep) -> BookService:
    return BookService(SQLModelBookRepository(db))


ServiceDep = Annotated[BookService, Depends(get_book_service)]


router = APIRouter(tags=["book"])


@router.post("/", response_model=PublicBook)
def register_book(book: BookCreate, service: ServiceDep, current_user: CurrentUserDep):
    return service.create_book(book, current_user.id_user)


@router.post("/description", response_model=PublicBookDescription)
def register_book_description(
    book_desc: BookDescCreate, service: ServiceDep, current_user: CurrentUserDep
):
    return service.create_book_description(book_desc)


@router.get("/", response_model=list[PublicBookDescription])
def get_my_books(
    service: ServiceDep,
    current_user: CurrentUserDep,
    li: Annotated[int, Query(ge=1, le=25)] = 10,
    of: Annotated[int, Query(ge=0)] = 0,
):
    return service.get_books_by_user_id(current_user.id_user, limit=li, offset=of)


@router.get("/description/{description_id}", response_model=PublicBookDescription)
def get_book_description(
    service: ServiceDep, current_uder: CurrentUserDep, description_id: int
):
    return service.get_book_description_by_id(description_id)


@router.get("/withdescription/{book_id}", response_model=PublicBookWithDescription)
def get_book_with_description(
    service: ServiceDep, current_user: CurrentUserDep, book_id: int
):
    return service.get_book_with_description_by_id(book_id, current_user.id_user)


@router.get("/{book_id}", response_model=PublicBook)
def get_book_by_id(book_id: int, service: ServiceDep, current_uder: CurrentUserDep):
    return service.get_book_by_id(book_id, current_uder.id_user)


@router.put("/", response_model=PublicBook)
def update_book(
    service: ServiceDep, current_user: CurrentUserDep, book_data: BookUpdate
):
    return service.update_book(book_data, current_user.id_user)


@router.put("/description", response_model=PublicBookDescription)
def update_description(
    service: ServiceDep, current_user: CurrentUserDep, desc_data: BookDescUpdate
):
    return service.update_book_description(desc_data)


@router.delete("/description/{desc_id}", status_code=200)
def delete_book_description(
    service: ServiceDep, current_user: CurrentUserDep, desc_id: int
):
    service.delete_book_description(desc_id)
    return {"detail": "Book description deleted"}


@router.delete("/{book_id}", status_code=200)
def delete_book(service: ServiceDep, current_user: CurrentUserDep, book_id: int):
    service.delete_book(book_id, current_user.id_user)
    return {"detail": "Book deleted"}
