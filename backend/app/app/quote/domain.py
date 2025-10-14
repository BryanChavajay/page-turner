from pydantic import BaseModel, Field


class Quote(BaseModel):
    id_quote: int | None = None
    id_book: int
    id_user: int
    quote_text: str = Field(max_length=128)
    page_number: int | None = None
    deleted: bool = False