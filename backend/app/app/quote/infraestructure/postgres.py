from sqlmodel import Session, select, func


from app.shared.sqlmodel_models import Quote as QuoteModel
from app.app.quote.domain import Quote
from app.app.quote.port import QuoteRepository


class SQLModelQuoteRepository(QuoteRepository):
    def __init__(self, db: Session):
        self.db = db

    def save(self, quote: Quote) -> Quote:
        quote_db = QuoteModel(**quote.model_dump())
        self.db.add(quote_db)
        self.db.commit()
        self.db.refresh(quote_db)
        return Quote.model_validate(quote_db, from_attributes=True)

    def find_by_id(self, id_quote: int) -> Quote | None:
        quote = self.db.get(QuoteModel, id_quote)
        return (
            Quote.model_validate(quote, from_attributes=True)
            if quote and not quote.deleted
            else None
        )

    def find_by_book_id(self, id_book: int) -> list[Quote]:
        statement = select(QuoteModel).where(
            QuoteModel.id_book == id_book,
            QuoteModel.deleted == False,  # noqa: E712
        )
        quotes = self.db.exec(statement).all()
        return [Quote.model_validate(quote, from_attributes=True) for quote in quotes]

    def find_by_user_id(self, id_user: int, limit: int, offset: int) -> list[Quote]:
        statement = (
            select(QuoteModel)
            .where(QuoteModel.id_user == id_user, QuoteModel.deleted == False)  # noqa: E712
            .limit(limit)
            .offset(offset)
        )
        quotes = self.db.exec(statement).all()
        return [Quote.model_validate(quote, from_attributes=True) for quote in quotes]

    def count_by_user_id(self, id_user: int) -> int:
        statement = (
            select(func.count())
            .select_from(QuoteModel)
            .where(
                QuoteModel.id_user == id_user,
                QuoteModel.deleted == False,  # noqa: E712
            )
        )
        count = self.db.exec(statement).one()
        return count

    def find_quote_ids_by_user_id(self, id_user: int) -> list[int]:
        statement = select(QuoteModel.id_quote).where(
            QuoteModel.id_user == id_user,
            QuoteModel.deleted == False,  # noqa: E712
        )
        quote_ids = self.db.exec(statement).all()
        return [id for id in quote_ids]

    def update(self, quote: Quote) -> Quote:
        statement = select(QuoteModel).where(
            QuoteModel.id_quote == quote.id_quote,
            QuoteModel.deleted == False,  # noqa: E712
        )
        quote_db = self.db.exec(statement).one()
        quote_db.sqlmodel_update(quote.model_dump())
        self.db.add(quote_db)
        self.db.commit()
        self.db.refresh(quote_db)
        return Quote.model_validate(quote_db, from_attributes=True)

    def delete(self, id_quote: int) -> bool:
        statement = select(QuoteModel).where(
            QuoteModel.id_quote == id_quote,
            QuoteModel.deleted == False,  # noqa: E712
        )
        quote = self.db.exec(statement).one()
        quote.deleted = True
        self.db.add(quote)
        self.db.commit()
        self.db.refresh(quote)
        return quote.deleted
