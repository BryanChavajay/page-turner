from fastapi import HTTPException, status

from app.app.user.port import UserRepository
from app.app.user.domain import User
from app.app.user.dtos import UserCreate, UserUpdate


class UserService:
    def __init__(self, user_respository: UserRepository):
        self.user_repository = user_respository

    def get_user_by_email(self, email: str) -> User:
        user = self.user_repository.find_by_email(email=email)
        if not user:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND, detail="User not found"
            )
        return user

    def get_user_by_username(self, username: str) -> User:
        user = self.user_repository.find_by_username(username=username)
        if not user:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND, detail="User not found"
            )
        return user

    def create_user(self, user: UserCreate) -> User:
        exist_username = self.user_repository.find_by_username(user.username)
        exist_email = self.user_repository.find_by_email(user.email)
        if exist_username or exist_email:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Username or email already registered",
            )
        new_user = self.user_repository.save(user)
        return new_user

    def update_user(
        self,
        user: UserUpdate,
    ) -> User:
        exist_username = self.user_repository.find_by_username(user.username)
        exist_email = self.user_repository.find_by_email(user.email)
        if exist_username or exist_email:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Username or email already registered",
            )
        updated_user = self.user_repository.update(user)
        return updated_user

    def delete_user(self, username: str) -> bool:
        result = self.user_repository.delete(username)
        if not result:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Error deleting user",
            )
        return result
