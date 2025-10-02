from typing import Annotated, Any

from fastapi import APIRouter, Depends, HTTPException

from app.app.user.dtos import PublicUser, UserCreate, UserUpdate
from app.app.user.application import UserService
from app.app.user.infraestructure.postgres import SQLModelUserRepository

from app.api.deps import SessionDep


def get_user_service(db: SessionDep) -> UserService:
    return UserService(SQLModelUserRepository(db))


ServiceDep = Annotated[UserService, Depends(get_user_service)]


router = APIRouter(tags=["user"])


@router.post("/", response_model=PublicUser)
def register_user(user: UserCreate, service: ServiceDep) -> Any:
    new_user = service.create_user(user)
    return new_user
