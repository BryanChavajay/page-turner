from datetime import datetime

from pydantic import BaseModel


class BaseRefreshToken(BaseModel):
    hash_token: str
    id_user: int
    expires_at: datetime
    created_at: datetime


class CreateRefreshToken(BaseRefreshToken):
    pass

class PublicRefreshToken(BaseRefreshToken):
    is_revoked: bool