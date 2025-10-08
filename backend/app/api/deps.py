from typing import Annotated

from fastapi import Depends, HTTPException, status
from sqlmodel import Session, select
import jwt
from fastapi.security import OAuth2PasswordBearer

from app.core.db import engine
from app.core.config import settings
from app.shared.sqlmodel_models import User
from app.shared.schemas import TokenPayload, CurrentUser


def get_session():
    with Session(engine) as session:
        yield session


SessionDep = Annotated[Session, Depends(get_session)]

reusable_oauth2 = OAuth2PasswordBearer(
    tokenUrl=f"{settings.API_V1_STR}/auth/access_token",
    refreshUrl=f"{settings.API_V1_STR}/auth/refresh_token",
)

TokenDep = Annotated[str, Depends(reusable_oauth2)]


def get_current_user(db: SessionDep, token: TokenDep) -> CurrentUser:
    try:
        payload = jwt.decode(
            jwt=token,
            key=settings.SECRET_KEY,
            algorithms=[
                settings.ALGORITHM,
            ],
        )
        token_data = TokenPayload(**payload)
    except:  # noqa: E722
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Could not validate credentials",
        )
    statement = select(User).where(
        User.username == token_data.sub, User.deleted == False
    )
    user = db.exec(statement).first()

    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="User not found"
        )
    if user.session_version != token_data.sv:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN, detail="Invalid session"
        )
    return CurrentUser.model_validate(user, from_attributes=True)


CurrentUserDep = Annotated[User, Depends(get_current_user)]
