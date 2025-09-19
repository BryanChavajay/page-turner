from datetime import datetime, time

from sqlmodel import Field, SQLModel


class User(SQLModel, table=True):
    id_user: int = Field(default=None, primary_key=True)
    username: str = Field(index=True, unique=True, max_length=50)
    email: str = Field(unique=True, max_length=100)
    password: str = Field(max_length=256)
    deleted: bool = False
    session_version: int = 1


class Book(SQLModel, table=True):
    id_book: int = Field(default=None, primary_key=True, index=True)
    title: str = Field(max_length=200)
    author: str = Field(max_length=100)
    genre: str = Field(max_length=50)
    status: str = Field(max_length=20)  # e.g., 'to_read', 'reading', 'read'
    reading_start: datetime | None = None
    reading_end: datetime | None = None
    rating: int | None = None  # e.g., 1 to 5
    deleted: bool = Field(default=False, index=True)
    id_user: int = Field(foreign_key="user.id_user")


class BookDescription(SQLModel, table=True):
    id_book_description: int = Field(default=None, primary_key=True)
    id_book: int = Field(foreign_key="book.id_book", unique=True, index=True)
    markdown_content: str = Field(max_length=1024)
    last_updated: datetime


class Quote(SQLModel, table=True):
    id_quote: int = Field(default=None, primary_key=True)
    id_book: int = Field(foreign_key="book.id_book", index=True)
    id_user: int = Field(foreign_key="user.id_user", index=True)
    quote_text: str = Field(max_length=128)
    page_number: int | None = None
    deleted: bool = False


class Notification(SQLModel, table=True):
    id_notification: int = Field(default=None, primary_key=True)
    id_user: int = Field(foreign_key="user.id_user", index=True)
    time_to_notify: time
    timezone: str = Field(max_length=50)
    is_active: bool = True


class RefreshToken(SQLModel, table=True):
    hash_token: str = Field(primary_key=True, max_length=256)
    id_user: int = Field(foreign_key="user.id_user", index=True)
    is_revoked: bool = False
    expires_at: datetime
    created_at: datetime
