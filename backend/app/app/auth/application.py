from datetime import timedelta

from fastapi import HTTPException, status

from app.core.security import verify_password, create_access_token
from app.app.auth.port import AuthRepository
from app.core.config import settings
from app.shared.schemas import TokenPayload, RefreshTokenPayload


class AuthService:
    def __init__(self, auth_repository: AuthRepository):
        self.auth_repository = auth_repository

    def authenticate(self, username: str, password: str) -> tuple[str, str]:
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

        access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
        refresh_token_expires = timedelta(days=settings.REFRESH_TOKEN_EXPIRE_DAYS)

        token_payload = TokenPayload(sub=user.username, sv=user.session_version)
        refresh_payload = RefreshTokenPayload(sub=user.username)

        access_token = create_access_token(
            data=token_payload.model_dump(), expires_delta=access_token_expires
        )
        refresh_token = create_access_token(
            data=refresh_payload.model_dump(), expires_delta=refresh_token_expires
        )

        return access_token, refresh_token

    def refresh_session(self, username: str) -> tuple[str, str]:
        user = self.auth_repository.find_by_username(username)
        if not user:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND, detail="User not found"
            )

        access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
        refresh_token_expires = timedelta(days=settings.REFRESH_TOKEN_EXPIRE_DAYS)

        token_payload = TokenPayload(sub=user.username, sv=user.session_version)
        refresh_payload = RefreshTokenPayload(sub=user.username)

        access_token = create_access_token(
            data=token_payload.model_dump(), expires_delta=access_token_expires
        )
        refresh_token = create_access_token(
            data=refresh_payload.model_dump(), expires_delta=refresh_token_expires
        )

        return access_token, refresh_token
