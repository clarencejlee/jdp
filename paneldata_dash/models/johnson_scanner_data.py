from typing import List

from db import db
from models import MarketModel, CategoryModel, BrandModel, PeriodModel


class FactsInData(db.Model):
    __tablename__ = "facts_in_johnson_scanner_data"

    id = db.Column(db.Integer, primary_key=True)
    fact_id = db.Column(db.Integer, db.ForeignKey("facts.id"))
    johnson_scanner_data_id = db.Column(db.Integer, db.ForeignKey("johnson_scanner_data.id"))
    value = db.Column(db.Float)

    fact = db.relationship("FactModel")
    johnson_scanner_data = db.relationship("JohnsonScannerDataModel", back_populates="facts")

    @classmethod
    def delete_all(cls) -> None:
        return cls.query.delete()


class JohnsonScannerDataModel(db.Model):
    __tablename__ = "johnson_scanner_data"

    id = db.Column(db.Integer, primary_key=True)

    brand_id = db.Column(db.Integer, db.ForeignKey("brands.id"), nullable=False)
    brand = db.relationship("BrandModel")

    category_id = db.Column(db.Integer, db.ForeignKey("categories.id"), nullable=False)
    category = db.relationship("CategoryModel")

    facts = db.relationship("FactsInData",  back_populates="johnson_scanner_data")

    market_id = db.Column(db.Integer, db.ForeignKey("markets.id"), nullable=False)
    market = db.relationship("MarketModel")

    period_id = db.Column(db.Integer, db.ForeignKey("periods.id"), nullable=False)
    period = db.relationship("PeriodModel")

    retailer = db.Column(db.String(80))
    department = db.Column(db.String(80))

    def save_to_db(self) -> None:
        db.session.add(self)

    def delete_from_db(self) -> None:
        db.session.delete(self)

    @classmethod
    def find_all(cls) -> List["JohnsonScannerDataModel"]:
        return cls.query.all()

    @classmethod
    def find_all_paginate(cls, page, size) -> List["JohnsonScannerDataModel"]:
        return cls.query.paginate(page, size, error_out=False).items

    @classmethod
    def find_all_filtered(cls, markets: List, categories: List, brands: List, periods: List) \
            -> List["JohnsonScannerDataModel"]:
        filters = []
        if len(markets) > 0:
            filters.append(MarketModel.name.in_(markets))
        if len(categories) > 0:
            filters.append(CategoryModel.name.in_(categories))
        if len(brands) > 0:
            filters.append(BrandModel.name.in_(brands))
        if len(periods) > 0:
            filters.append(PeriodModel.name.in_(periods))

        query = db.session.query(JohnsonScannerDataModel). \
            join(JohnsonScannerDataModel.market, JohnsonScannerDataModel.category, JohnsonScannerDataModel.brand,
                 JohnsonScannerDataModel.period).filter(*filters)

        return query.all()

    @classmethod
    def delete_all(cls) -> None:
        return cls.query.delete()
