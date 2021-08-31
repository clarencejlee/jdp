from ma import ma
from models.johnson_scanner_data import FactsInData
from schemas.fact import FactSchema


class FactsInDataSchema(ma.SQLAlchemyAutoSchema):
    fact = ma.Nested(FactSchema)

    class Meta:
        model = FactsInData
        dump_only = ("id",)
