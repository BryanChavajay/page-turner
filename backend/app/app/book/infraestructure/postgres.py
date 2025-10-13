from sqlmodel import Session, select


from app.shared.sqlmodel_models import (
    Book as BookModel,
    BookDescription as BookDescriptionModel,
)
from app.app.book.port import BookRepository
from app.app.book.domain import Book, BookDescription, BookWithDescription
from app.app.book.dtos import BookCreate, BookUpdate, BookDescCreate, BookDescUpdate


class SQLModelBookRepository(BookRepository):
    def __init__(self, db: Session):
        self.db = db

    def save(self, book: BookCreate) -> Book:
        db_book = BookModel.model_validate(book)
        self.db.add(db_book)
        self.db.commit()
        self.db.refresh(db_book)
        return Book.model_validate(db_book, from_attributes=True)

    def save_description(self, book_desc: BookDescCreate) -> BookDescription:
        db_book_desc = BookDescriptionModel.model_validate(book_desc)
        self.db.add(db_book_desc)
        self.db.commit()
        self.db.refresh(db_book_desc)
        return BookDescription.model_validate(db_book_desc, from_attributes=True)

    def find_by_id(self, book_id: int) -> Book | None:
        statement = select(BookModel).where(
            BookModel.id_book == book_id, BookModel.deleted == False
        )
        book = self.db.exec(statement).first()
        return Book.model_validate(book, from_attributes=True) if book else None

    def find_by_user_id(
        self, user_id: int, limit: int = 10, offset: int = 0
    ) -> list[Book]:
        statement = (
            select(BookModel)
            .where(BookModel.id_user == user_id, BookModel.deleted == False)
            .limit(limit)
            .offset(offset)
            .order_by(BookModel.title)
        )
        books = self.db.exec(statement).all()
        return [Book.model_validate(book, from_attributes=True) for book in books]

    def find_description_by_id(self, description_id: int) -> BookDescription | None:
        statement = select(BookDescriptionModel).where(
            BookDescriptionModel.id_book_description == description_id
        )
        result = self.db.exec(statement).first()
        return (
            BookDescription.model_validate(result, from_attributes=True)
            if result
            else None
        )

    def find_book_with_description_by_id(
        self, book_id: int
    ) -> BookWithDescription | None:
        statement = select(BookModel).where(
            BookModel.id_book == book_id, BookModel.deleted == False
        )
        book = self.db.exec(statement).first()
        if book:
            return BookWithDescription.model_validate(book, from_attributes=True)
        return None

    def find_description_by_book_id(self, book_id: int) -> BookDescription | None:
        statement = select(BookDescriptionModel).where(
            BookDescriptionModel.id_book == book_id
        )
        result = self.db.exec(statement).first()
        return (
            BookDescription.model_validate(result, from_attributes=True)
            if result
            else None
        )

    def update(self, new_book: BookUpdate) -> Book:
        statement = select(BookModel).where(
            BookModel.id_book == new_book.id_book, BookModel.deleted == False
        )
        book = self.db.exec(statement).one()
        book.sqlmodel_update(new_book.model_dump(exclude_unset=True))
        self.db.add(book)
        self.db.commit()
        self.db.refresh(book)
        return Book.model_validate(book, from_attributes=True)

    def update_description(self, new_book_desc: BookDescUpdate) -> BookDescription:
        statement = select(BookDescriptionModel).where(
            BookDescriptionModel.id_book_description
            == new_book_desc.id_book_description
        )
        book_desc = self.db.exec(statement).one()
        book_desc.sqlmodel_update(new_book_desc.model_dump(exclude_unset=True))
        self.db.add(book_desc)
        self.db.commit()
        self.db.refresh(book_desc)
        return BookDescription.model_validate(book_desc, from_attributes=True)

    def delete(self, book_id: int) -> bool:
        statement = select(BookModel).where(
            BookModel.id_book == book_id, BookModel.deleted == False
        )
        book = self.db.exec(statement).first()
        if book is None:
            return False
        book.deleted = True
        self.db.commit()
        self.db.refresh(book)
        return book.deleted

    def delete_description(self, description_id: int) -> bool:
        statement = select(BookDescriptionModel).where(
            BookDescriptionModel.id_book_description == description_id
        )
        book_desc = self.db.exec(statement).first()
        if book_desc is None:
            return False
        self.db.delete(book_desc)
        self.db.commit()
        # Verify deletion
        book_desc = self.db.exec(statement).first()
        return book_desc is None
