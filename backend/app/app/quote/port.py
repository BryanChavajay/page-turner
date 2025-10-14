from abc import ABC, abstractmethod

from app.app.quote.domain import Quote


class QuoteRepository(ABC):
    @abstractmethod
    def save(self, quote: Quote) -> Quote:
        pass

    @abstractmethod
    def find_by_id(self, id_quote: int) -> Quote | None:
        pass

    @abstractmethod
    def find_by_book_id(self, id_book: int) -> list[Quote]:
        pass

    @abstractmethod
    def find_by_user_id(self, id_user: int, limit: int, offset: int) -> list[Quote]:
        pass

    @abstractmethod
    def count_by_user_id(self, id_user: int) -> int:
        pass

    @abstractmethod
    def update(self, quote: Quote) -> Quote:
        pass

    @abstractmethod
    def delete(self, id_quote: int) -> bool:
        pass
