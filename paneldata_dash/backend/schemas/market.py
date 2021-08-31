from ma import ma
from models.market import MarketModel


class MarketSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = MarketModel
        dump_only = ("id",)
