import random

from fastapi import HTTPException, status


from app.app.quote.domain import Quote
from app.app.quote.port import QuoteRepository
from app.app.quote.dtos import CreateQuote, UpdateQuote


class QuoteService:
    def __init__(self, repository: QuoteRepository):
        self.repository = repository

    def register_quote(self, quote: CreateQuote) -> Quote:
        new_quote = Quote.model_validate(quote)
        return self.repository.save(new_quote)

    def get_quote_by_id(self, id_quote: int) -> Quote:
        quote = self.repository.find_by_id(id_quote)
        if not quote:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND, detail="Quote not found"
            )
        return quote

    def get_quotes_by_book_id(self, id_book: int) -> list[Quote]:
        return self.repository.find_by_book_id(id_book)

    def get_quotes_by_user_id(
        self, id_user: int, limit: int, offset: int
    ) -> list[Quote]:
        return self.repository.find_by_user_id(id_user, limit, offset)

    def get_random_quote_by_user_id(self, id_user: int) -> Quote | None:
        quote_ids = self.repository.find_quote_ids_by_user_id(id_user)
        if not quote_ids:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND, detail="User has no quotes"
            )
        random_id = random.choice(quote_ids)
        return self.repository.find_by_id(random_id)

    def update_quote(self, quote: UpdateQuote, id_user: int) -> Quote:
        old_quote = self.repository.find_by_id(quote.id_quote)
        if not old_quote or old_quote.id_user != id_user:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND, detail="Quote not found"
            )
        new_quote = old_quote.model_copy(update=quote.model_dump(exclude_unset=True))
        return self.repository.update(new_quote)

    def delete_quote(self, id_quote: int, id_user: int) -> bool:
        quote = self.repository.find_by_id(id_quote)
        if not quote or quote.id_user != id_user:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND, detail="Quote not found"
            )
        return self.repository.delete(id_quote)
