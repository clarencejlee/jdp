from ma import ma
from marshmallow import EXCLUDE


class SQLSchema(ma.SQLAlchemySchema):

    class Meta:
        fields = ("id", "brand_id", "description", "brand_name", "category_id", "category_name", "period_id",
                  "value", "name", "johnson_scanner_data_id", "period_name", "market_id", "categories_id",
                  "market_name", "fact_id", "fact_name", "department", "retailer", "tablename", "table_name", "column_name",
                  "is_nullable", "data_type", "character_maximum_length")

        unknown= EXCLUDE

