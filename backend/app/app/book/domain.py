from datetime import datetime
from typing import Literal

from pydantic import BaseModel, Field


class Book(BaseModel):
    id_book: int
    title: str
    id_book: int
    title: str
    author: str
    genre: str | None
    status: Literal["to_read", "reading", "read"]  # e.g., 'to_read', 'reading', 'read'
    reading_start: datetime | None = None
    reading_end: datetime | None = None
    rating: int | None = Field(ge=1, le=5, default=None)  # e.g., 1 to 5
    deleted: bool
    id_user: int


class BookDescription(BaseModel):
    id_book_description: int
    id_book: int
    markdown_content: str = Field(max_length=1024)
    last_updated: datetime


class BookWithDescription(Book):
    description: BookDescription | None = None
