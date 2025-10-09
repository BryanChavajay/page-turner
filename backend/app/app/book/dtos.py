from datetime import datetime
from typing import Literal

from pydantic import BaseModel, Field


# Base class for shared attributes
class BaseBook(BaseModel):
    title: str = Field(max_length=200)
    author: str = Field(max_length=100)
    genre: str | None = Field(max_length=50, default=None)


class BookDescription(BaseModel):
    id_book: int
    markdown_content: str = Field(max_length=1024)


# Create DTOs
class BookCreate(BaseBook):
    status: Literal["to_read", "reading", "read"] = (
        "to_read"  # e.g., 'to_read', 'reading', 'read'
    )
    reading_start: datetime | None = None
    reading_end: datetime | None = None
    rating: int | None = Field(ge=1, le=5, default=None)  # e.g., 1 to 5
    id_user: int


class BookDescCreate(BookDescription):
    pass


# Update DTOs
class BookUpdate(BaseBook):
    id_book: int
    status: Literal["to_read", "reading", "read"]  # e.g., 'to_read', 'reading', 'read'
    reading_start: datetime | None = None
    reading_end: datetime | None = None
    rating: int | None = Field(ge=1, le=5, default=None)  # e.g., 1 to 5


class BookDescUpdate(BaseModel):
    id_book_description: int


# Public DTOs
class PublicBook(BaseBook):
    id_book: int
    status: str
    reading_start: datetime | None = None
    reading_end: datetime | None = None
    rating: int | None = None


class PublicBookDescription(BaseModel):
    id_book_description: int
    id_book: int
    markdown_content: str


class PublicBookWithDescription(PublicBook):
    description: PublicBookDescription
