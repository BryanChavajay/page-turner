from pydantic import BaseModel, EmailStr


class TokenPayload(BaseModel):
    sub: str
    sv: int


class RefreshTokenPayload(BaseModel):
    sub: str
    sv: int


class CurrentUser(BaseModel):
    id_user: int
    username: str
    email: EmailStr
