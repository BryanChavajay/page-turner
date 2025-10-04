from fastapi import HTTPException, status

from app.core.security import verify_password
from app.app.auth.port import AuthRepository


class AuthService:
    def __init__(self, auth_repository: AuthRepository):
        self.auth_repository = auth_repository

    def authenticate(self, username: str, password: str):
        user = None
        if "@" in username:
            user = self.auth_repository.find_by_email(username)
        else:
            user = self.auth_repository.find_by_username(username)

        if not user:
            raise HTTPException(
                status.HTTP_404_NOT_FOUND, detail="Incorrect username or password"
            )
        if verify_password(password, user.password):
            raise HTTPException(
                status.HTTP_404_NOT_FOUND, detail="Incorrect username or password"
            )

        return user  # Todo: return token

    def create_refresh_token(self, username: str):
        user = self.auth_repository.find_by_username(username)
        if not user:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND, detail="User not found"
            )
        return user  # Todo: return refresh token
