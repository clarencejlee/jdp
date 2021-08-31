from ma import ma
from models.market import MarketModel


class MarketSchema(ma.ModelSchema):
    class Meta:
        model = MarketModel
        dump_only = ("id",)
