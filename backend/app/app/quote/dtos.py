from pydantic import BaseModel, Field


class BaseQuote(BaseModel):
    id_book: int
    quote_text: str = Field(max_length=128)


class CreateQuote(BaseQuote):
    id_user: int | None = None
    page_number: int | None = None


class PublicQuote(BaseQuote):
    id_quote: int
    page_number: int | None = None


class UpdateQuote(BaseModel):
    id_quote: int = Field(gt=0)
    quote_text: str | None = Field(default=None, max_length=128)
    page_number: int | None = None
