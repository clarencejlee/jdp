from ma import ma
from models.johnson_scanner_data import JohnsonScannerDataModel
from schemas.brand import BrandSchema
from schemas.category import CategorySchema
from schemas.facts_in_data import FactsInDataSchema
from schemas.market import MarketSchema
from schemas.period import PeriodSchema


class JohnsonScannerDataSchema(ma.SQLAlchemySchema):
    market = ma.Nested(MarketSchema)
    brand = ma.Nested(BrandSchema)
    category = ma.Nested(CategorySchema)
    period = ma.Nested(PeriodSchema)
    facts = ma.Nested(FactsInDataSchema, many=True)

    class Meta:
        model = JohnsonScannerDataModel
        dump_only = ("id",)
        # include_fk = False



