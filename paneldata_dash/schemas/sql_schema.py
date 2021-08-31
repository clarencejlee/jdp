from ma import ma


class SQLSchema(ma.ModelSchema):

    class Meta:
        fields = ("id", "brand_id", "description", "brand_name", "category_id", "category_name", "period_id",
                  "value", "name","johnson_scanner_data_id", "period_name", "market_id",
                  "market_name","fact_id", "fact_name", "department", "retailer")



