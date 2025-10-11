from fastapi import HTTPException, status

from app.app.book.domain import Book, BookDescription, BookWithDescription
from app.app.book.dtos import BookCreate, BookUpdate, BookDescCreate, BookDescUpdate
from app.app.book.port import BookRepository


class BookService:
    def __init__(self, repository: BookRepository):
        self.repository = repository

    def create_book(self, book_data: BookCreate, id_user: int) -> Book:
        book_data.id_user = id_user
        return self.repository.save(book_data)

    def create_book_description(
        self, book_desc_data: BookDescCreate
    ) -> BookDescription:
        exist_book = self.repository.find_by_id(book_desc_data.id_book)
        if not exist_book:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND, detail="Book not found"
            )
        return self.repository.save_description(book_desc_data)

    def get_book_by_id(self, book_id: int, id_user: int) -> Book:
        book = self.repository.find_by_id(book_id)
        if book is None or book.id_user != id_user:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND, detail="Book not found"
            )
        return book

    def get_books_by_user_id(
        self, user_id: int, limit: int = 10, offset: int = 0
    ) -> list[Book]:
        return self.repository.find_by_user_id(user_id, limit, offset)

    def get_book_description_by_id(self, description_id: int) -> BookDescription:
        description = self.repository.find_description_by_id(description_id)
        if description is None:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST, detail="Description not found"
            )
        return description

    def get_book_with_description_by_id(
        self, book_id: int, user_id: int
    ) -> BookWithDescription:
        book = self.repository.find_book_with_description_by_id(book_id)
        if book is None or book.id_user != user_id:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND, detail="Book not found"
            )
        return book

    def update_book(self, book_data: BookUpdate, user_id: int) -> Book:
        old_book = self.repository.find_by_id(book_data.id_book)
        if old_book is None or old_book.id_user != user_id:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND, detail="Book not found"
            )
        return self.repository.update(book_data)

    def update_book_description(
        self, book_desc_data: BookDescUpdate
    ) -> BookDescription:
        return self.repository.update_description(book_desc_data)

    def delete_book(self, book_id: int, user_id: int) -> bool:
        old_book = self.repository.find_by_id(book_id)
        if old_book is None or old_book.id_user != user_id:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND, detail="Book not found"
            )
        if not self.repository.delete(book_id):
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Book could not be deleted",
            )
        return True

    def delete_book_description(self, description_id: int) -> bool:
        if not self.repository.delete_description(description_id):
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Book description could not be deleted",
            )
        return True
