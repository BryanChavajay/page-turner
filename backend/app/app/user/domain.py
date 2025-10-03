from pydantic import BaseModel

class User(BaseModel):
    id_user: int
    username: str
    email: str
    deleted: bool
    session_version: int
    password: str