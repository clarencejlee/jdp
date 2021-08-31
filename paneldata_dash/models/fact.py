from typing import List

from db import db


class FactModel(db.Model):
    __tablename__ = "facts"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), nullable=False, unique=True)
    description = db.Column(db.String(255), nullable=True)

    def save_to_db(self) -> None:
        db.session.add(self)

    def delete_from_db(self) -> None:
        db.session.delete(self)

    @classmethod
    def find_by_name(cls, name: str) -> "FactModel":
        return cls.query.filter_by(name=name).first()

    @classmethod
    def find_by_id(cls, _id: int) -> "FactModel":
        return cls.query.filter_by(id=_id).first()

    @classmethod
    def find_all(cls) -> List["FactModel"]:
        return cls.query.all()

    @classmethod
    def find_all_paginate(cls, page, size) -> List["FactModel"]:
        return cls.query.paginate(page, size, error_out=False).items

    @classmethod
    def find_all_filtered(cls, facts: List) \
            -> List["FactModel"]:
        filters = []
        if len(facts) > 0:
            filters.append(FactModel.name.in_(facts))

        query = db.session.query(FactModel).filter(*filters)

        return query.all()

    @classmethod
    def delete_all(cls) -> None:
        return cls.query.delete()
