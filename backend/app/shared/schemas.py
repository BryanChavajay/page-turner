from pydantic import BaseModel


class TokenPayload(BaseModel):
    sub: str
    sv: int


class RefreshTokenPayload(BaseModel):
    sub: str
    sv: int