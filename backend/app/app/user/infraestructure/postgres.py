from sqlmodel import Session, select

from app.core.sqlmodel_models import User as UserModel

from app.app.user.port import UserRepository
from app.app.user.domain import User
from app.app.user.dtos import UserCreate, UserUpdate

from app.core.security import get_password_hash


class SQLModelUserRepository(UserRepository):
    def __init__(self, db: Session):
        self.db = db

    def find_by_id(self, user_id: int) -> User | None:
        user = self.db.get(UserModel, user_id)
        return User.model_validate(user) if user else None

    def find_by_email(self, email: str) -> User | None:
        statement = select(UserModel).where(UserModel.email == email)
        user = self.db.exec(statement).first()
        return User.model_validate(user, from_attributes=True) if user else None

    def find_by_username(self, username: str) -> User | None:
        statement = select(UserModel).where(UserModel.username == username)
        user = self.db.exec(statement).first()
        return User.model_validate(user, from_attributes=True) if user else None

    def save(self, user: UserCreate) -> User:
        user_db = UserModel(**user.model_dump())
        hash_password = get_password_hash(user.password)
        user_db.password = hash_password
        self.db.add(user_db)
        self.db.commit()
        self.db.refresh(user_db)
        return User.model_validate(user_db, from_attributes=True)

    def update(self, user: UserUpdate) -> User:
        statement = select(UserModel).where(UserModel.username == user.username)
        user_db = self.db.exec(statement).one()
        if not user.password:
            hash_password: str = user_db.password
            user_db.password = hash_password
        user_db.email = user.email
        user_db.username = user.username
        user_db.session_version = user_db.session_version + 1
        self.db.commit()
        self.db.refresh(user_db)
        return User.model_validate(user_db, from_attributes=True)

    def delete(self, username: str) -> bool:
        statement = select(UserModel).where(UserModel.username == username)
        user_db = self.db.exec(statement).first()
        self.db.delete(user_db)
        self.db.commit()
        self.db.refresh(user_db)

        statement = select(UserModel).where(UserModel.username == username)
        user_db = self.db.exec(statement).first()
        if user_db is None:
            return True

        return False
