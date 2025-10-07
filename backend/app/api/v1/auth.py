from typing import Annotated

from fastapi import APIRouter, HTTPException, status, Depends, Response
from fastapi.security import OAuth2PasswordRequestForm

from app.app.auth.infraestructure.postgres import SQLModelAuthRepository
from app.app.auth.application import AuthService
from app.app.auth.dtos import Token
from app.api.deps import SessionDep


def get_auth_service(db: SessionDep) -> AuthService:
    return AuthService(SQLModelAuthRepository(db))


ServiceDep = Annotated[AuthService, Depends(get_auth_service)]
FormDataDep = Annotated[OAuth2PasswordRequestForm, Depends()]

router = APIRouter(tags=["auth"])


@router.post("/access_token")
def get_access_token(service: ServiceDep, form_data: FormDataDep, response: Response):
    access_token, refresh_token = service.authenticate(
        username=form_data.username, password=form_data.password
    )

    response.set_cookie(
        key="refresh_token",
        value=refresh_token,
        httponly=True,
        secure=True,
        samesite="strict",
    )

    return Token(access_token=access_token)


