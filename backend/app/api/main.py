from fastapi import APIRouter

from app.api.v1 import user, auth, book, quote
from app.core.config import settings

api_router = APIRouter()

# API v1
api_router.include_router(user.router, prefix=f"{settings.API_V1_STR}/user")
api_router.include_router(auth.router, prefix=f"{settings.API_V1_STR}/auth")
api_router.include_router(book.router, prefix=f"{settings.API_V1_STR}/book")
api_router.include_router(quote.router, prefix=f"{settings.API_V1_STR}/quote")
