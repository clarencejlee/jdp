from ma import ma
from models.period import PeriodModel


class PeriodSchema(ma.ModelSchema):
    class Meta:
        model = PeriodModel
        dump_only = ("id",)
