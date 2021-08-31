from typing import List

from db import db


class PeriodModel(db.Model):
    __tablename__ = "periods"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), nullable=False, unique=True)
    description = db.Column(db.String(255), nullable=True)

    def save_to_db(self) -> None:
        db.session.add(self)

    def delete_and_persist_from_db(self) -> None:
        db.session.delete(self)

    @classmethod
    def find_by_name(cls, name: str) -> "PeriodModel":
        return cls.query.filter_by(name=name).first()

    @classmethod
    def find_by_id(cls, _id: int) -> "PeriodModel":
        return cls.query.filter_by(id=_id).first()

    @classmethod
    def find_all(cls) -> List["PeriodModel"]:
        return cls.query.all()

    @classmethod
    def find_all_paginate(cls, page, size) -> List["PeriodModel"]:
        return cls.query.paginate(page, size, error_out=False).items

    @classmethod
    def delete_all(cls) -> None:
        return cls.query.delete()
