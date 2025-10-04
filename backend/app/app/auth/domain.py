from datetime import datetime
from pydantic import BaseModel


class User(BaseModel):
    id_user: int
    email: str
    username: str
    password: str
    session_version: int


class RefreshToken(BaseModel):
    hash_token: str
    id_user: int
    is_revoked: bool
    expires_at: datetime
    created_at: datetime
