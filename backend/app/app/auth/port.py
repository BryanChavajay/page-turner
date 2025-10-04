from abc import ABC, abstractmethod


from app.app.auth.domain import User, RefreshToken
from app.app.auth.dtos import CreateRefreshToken


class AuthRepository(ABC):
    @abstractmethod
    def find_by_username(self, username: str) -> User | None:
        pass

    @abstractmethod
    def find_by_email(self, email: str) -> User | None:
        pass

    @abstractmethod
    def find_refresh_token_by_hashtoken(self, hashed_token: str) -> RefreshToken | None:
        pass

    @abstractmethod
    def save_refresh_token(self, refresh_token: CreateRefreshToken) -> RefreshToken:
        pass
