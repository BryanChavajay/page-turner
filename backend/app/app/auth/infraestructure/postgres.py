from sqlmodel import Session, select

from app.shared.sqlmodel_models import (
    User as UserModel,
    RefreshToken as RefreshTokenModel,
)
from app.app.auth.port import AuthRepository
from app.app.auth.dtos import CreateRefreshToken
from app.app.auth.domain import User, RefreshToken


class SQLModelAuthRepository(AuthRepository):
    def __init__(self, db: Session) -> None:
        self.db = db

    def find_by_username(self, username: str, password: str) -> User | None:
        statement = select(UserModel).where(
            UserModel.username == username, UserModel.deleted == False  # noqa: E712
        )
        user = self.db.exec(statement).first()
        if user:
            return User.model_validate(user, from_attributes=True)
        return None

    def find_by_email(self, email: str, password: str) -> User | None:
        statement = select(UserModel).where(
            UserModel.email == email, UserModel.deleted == False # noqa: E712
        )
        user = self.db.exec(statement).first()
        if user:
            return User.model_validate(user, from_attributes=True)
        return None

    def find_refresh_token_by_hashtoken(self, hash_token: str) -> RefreshToken | None:
        statement = select(RefreshTokenModel).where(
            RefreshTokenModel.hash_token == hash_token
        )
        refresh_token = self.db.exec(statement).first()
        if refresh_token:
            return RefreshToken.model_validate(refresh_token, from_attributes=True)
        return None

    def save_refresh_token(self, refresh_token: CreateRefreshToken) -> RefreshToken:
        db_token = RefreshTokenModel.model_validate(**refresh_token.model_dump())
        self.db.add(db_token)
        self.db.commit()
        self.db.refresh(db_token)
        return RefreshToken.model_validate(db_token, from_attributes=True)
