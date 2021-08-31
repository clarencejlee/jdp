from ma import ma
from models.brand import BrandModel


class BrandSchema(ma.ModelSchema):
    class Meta:
        model = BrandModel
        dump_only = ("id",)
