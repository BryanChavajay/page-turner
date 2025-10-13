from abc import ABC, abstractmethod


from app.app.book.domain import Book, BookDescription, BookWithDescription
from app.app.book.dtos import BookCreate, BookUpdate, BookDescCreate, BookDescUpdate


class BookRepository(ABC):
    @abstractmethod
    def save(self, book: BookCreate) -> Book:
        pass

    @abstractmethod
    def save_description(self, book_desc: BookDescCreate) -> BookDescription:
        pass

    @abstractmethod
    def find_by_id(self, book_id: int) -> Book | None:
        pass

    @abstractmethod
    def find_by_user_id(
        self, user_id: int, limit: int = 10, offset: int = 0
    ) -> list[Book]:
        pass

    @abstractmethod
    def find_description_by_id(self, description_id: int) -> BookDescription | None:
        pass

    @abstractmethod
    def find_book_with_description_by_id(
        self, book_id: int
    ) -> BookWithDescription | None:
        pass

    @abstractmethod
    def find_description_by_book_id(self, book_id: int) -> BookDescription | None:
        pass

    @abstractmethod
    def update(self, book: BookUpdate) -> Book:
        pass

    @abstractmethod
    def update_description(self, book_desc: BookDescUpdate) -> BookDescription:
        pass

    @abstractmethod
    def delete(self, book_id: int) -> bool:
        pass

    @abstractmethod
    def delete_description(self, description_id: int) -> bool:
        pass
