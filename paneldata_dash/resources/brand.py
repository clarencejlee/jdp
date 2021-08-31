from flask import request
from flask_restful import Resource

from models.brand import BrandModel
from schemas.brand import BrandSchema

brand_schema = BrandSchema()
brand_list_schema = BrandSchema(many=True)


class Brand(Resource):

    @classmethod
    def get(cls, name: str):
        brand = BrandModel.find_by_name(name)
        if brand:
            return brand_schema.dump(brand), 200

        return {"message": "Brand not found"}, 404


class BrandList(Resource):
    @classmethod
    def get(cls):
        page = 1 if (request.args.get("page") is None or request.args.get("page") == 0) \
            else int(request.args.get("page")) + 1
        size = 10 if request.args.get("size") is None else int(request.args.get("size"))
        return {"brands": brand_list_schema.dump(BrandModel.find_all())}, 200

