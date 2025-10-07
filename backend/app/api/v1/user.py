from typing import Annotated, Any

from fastapi import APIRouter, Depends, HTTPException

from app.app.user.dtos import PublicUser, UserCreate, UserUpdate
from app.app.user.application import UserService
from app.app.user.infraestructure.postgres import SQLModelUserRepository

from app.api.deps import SessionDep, CurrentUserDep


def get_user_service(db: SessionDep) -> UserService:
    return UserService(SQLModelUserRepository(db))


ServiceDep = Annotated[UserService, Depends(get_user_service)]


router = APIRouter(tags=["user"])


@router.post("/", response_model=PublicUser)
def register_user(user: UserCreate, service: ServiceDep) -> Any:
    new_user = service.create_user(user)
    return new_user


@router.get("/me", response_model=PublicUser)
def get_my_user(current_user: CurrentUserDep, service: ServiceDep) -> Any:
    user = service.get_user_by_username(current_user.username)
    return user
