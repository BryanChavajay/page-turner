from abc import ABC, abstractmethod

from app.app.user.dtos import UserCreate, UserUpdate
from app.app.user.domain import User


class UserRepository(ABC):
    @abstractmethod
    def find_by_id(self, user_id: int) -> User | None:
        pass

    @abstractmethod
    def find_by_email(self, email: str) -> User | None:
        pass

    @abstractmethod
    def find_by_username(self, username: str) -> User | None:
        pass

    @abstractmethod
    def save(self, user: UserCreate) -> User:
        pass

    @abstractmethod
    def update(self, user: UserUpdate, actual_username: str) -> User:
        pass

    @abstractmethod
    def delete(self, username: str) -> bool:
        pass
