from typing import List

from db import db


class CategoryModel(db.Model):
    __tablename__ = "categories"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), nullable=False, unique=True)
    market_id = db.Column(db.Integer, db.ForeignKey("markets.id"))
    description = db.Column(db.String(255), nullable=True)

    market = db.relationship("MarketModel")

    def save_to_db(self) -> None:
        db.session.add(self)

    def delete_from_db(self) -> None:
        db.session.delete(self)

    @classmethod
    def find_by_name(cls, name: str) -> "CategoryModel":
        return cls.query.filter_by(name=name).first()

    @classmethod
    def find_by_id(cls, _id: int) -> "CategoryModel":
        return cls.query.filter_by(id=_id).first()

    @classmethod
    def find_all(cls) -> List["CategoryModel"]:
        return cls.query.all()

    @classmethod
    def find_all_paginate(cls, page, size) -> List["CategoryModel"]:
        return cls.query.paginate(page, size, error_out=False).items

    @classmethod
    def delete_all(cls) -> None:
        return cls.query.delete()
