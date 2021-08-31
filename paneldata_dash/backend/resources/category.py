from flask import request
from flask_restful import Resource

from libs.auth_helper import token_required
from models.category import CategoryModel
from schemas.category import CategorySchema

category_schema = CategorySchema()
category_list_schema = CategorySchema(many=True)


class Category(Resource):

    @classmethod
    @token_required
    def get(cls, name: str):
        category = CategoryModel.find_by_name(name)
        if category:
            return category_schema.dump(category), 200

        return {"message": "Category not found"}, 404


class CategoryList(Resource):
    @classmethod
    @token_required
    def get(cls):
        page = 1 if (request.args.get("page") is None or request.args.get("page") == 0) \
            else int(request.args.get("page")) + 1
        size = 10 if request.args.get("size") is None else int(request.args.get("size"))
        return {"categories": category_list_schema.dump(CategoryModel.find_all())}, 200
