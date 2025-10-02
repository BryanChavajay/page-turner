from fastapi import APIRouter

from app.api.v1 import user
from app.core.config import settings

api_router = APIRouter()

# API v1
api_router.include_router(user.router, prefix=f"{settings.API_V1_STR}/user")
