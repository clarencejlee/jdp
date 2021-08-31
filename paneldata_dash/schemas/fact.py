from ma import ma
from models.fact import FactModel


class FactSchema(ma.ModelSchema):
    class Meta:
        model = FactModel
        dump_only = ("id",)
