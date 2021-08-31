from ma import ma
from models.fact import FactModel


class FactSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = FactModel
        dump_only = ("id",)
