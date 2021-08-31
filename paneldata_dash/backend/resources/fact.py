from flask import request
from flask_restful import Resource

from libs.auth_helper import token_required
from models.fact import FactModel
from schemas.fact import FactSchema

fact_schema = FactSchema()
fact_list_schema = FactSchema(many=True)


class Fact(Resource):

    @classmethod
    @token_required
    def get(cls, name: str):
        fact = FactModel.find_by_name(name)
        if fact:
            return fact_schema.dump(fact), 200

        return {"message": "Fact not found"}, 404


class FactList(Resource):
    @classmethod
    @token_required
    def get(cls):
        page = 1 if (request.args.get("page") is None or request.args.get("page") == 0 ) \
            else int(request.args.get("page")) + 1
        size = 10 if request.args.get("size") is None else int(request.args.get("size"))
        return {"facts": fact_list_schema.dump(FactModel.find_all())}, 200
