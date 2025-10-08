from pydantic import BaseModel, Field, EmailStr


class BaseUser(BaseModel):
    email: EmailStr = Field(max_length=100)
    username: str = Field(max_length=50, min_length=3)


class PublicUser(BaseUser):
    pass


class UserCreate(BaseUser):
    password: str = Field(max_length=50, min_length=6)


class UserUpdate(BaseUser):
    email: EmailStr | None = Field(max_length=100, default=None)
    username: str | None = Field(max_length=50, min_length=3, default=None) 
    password: str | None = Field(default=None, max_length=50, min_length=6)
