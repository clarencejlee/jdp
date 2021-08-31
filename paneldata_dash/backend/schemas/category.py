from ma import ma
from models.category import CategoryModel
from schemas.market import MarketSchema


class CategorySchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        include_fk = True
        model = CategoryModel
        dump_only = ("id",)
        fields = ("id", "name", "market")
    market = ma.Nested(MarketSchema)