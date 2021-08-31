from ma import ma
from models.brand import BrandModel
from schemas.category import CategorySchema


class BrandSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        include_fk = True
        model = BrandModel
        dump_only = ("id",)
        fields = ("id", "name", "category")
    category = ma.Nested(CategorySchema)
