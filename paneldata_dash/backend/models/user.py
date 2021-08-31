import random

from db import db


class UserModel(db.Model):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.Text, nullable=False, unique=True)
    password = db.Column(db.String(80), nullable=False)
    one_time_token = db.Column(db.String(80), nullable=True)
    email = db.Column(db.String(80), nullable=False, unique=True)

    # INSTANCE METHODS
    def __init__(self, username, password, email):
        self.username = username
        self.password = password
        self.email = email

    def save_to_db(self) -> None:
        db.session.add(self)

    def delete_and_persist_from_db(self) -> None:
        db.session.delete(self)

    @classmethod
    def generate_unusable_password(cls):
        password_length = 5
        possible_characters = "abcdefghijklmnopqrstuvwxyz1234567890"

        random_character_list = [random.choice(possible_characters) for i in range(password_length)]
        random_password = "".join(random_character_list)
        return random_password

    @classmethod
    def find_by_username(cls, username: str) -> "UserModel":
        return cls.query.filter_by(username=username).first()

    @classmethod
    def find_by_token(cls, token:str) -> "UserModel":
        return cls.query.filter_by(one_time_token=token).first()

    @classmethod
    def find_by_email(cls, email: str) -> "UserModel":
        return cls.query.filter_by(email=email).first()

    @classmethod
    def find_by_id(cls, _id: int) -> "UserModel":
        return cls.query.filter_by(id=_id).first()


