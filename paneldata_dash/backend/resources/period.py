from flask import request
from flask_restful import Resource

from libs.auth_helper import token_required
from models.period import PeriodModel
from schemas.period import PeriodSchema

period_schema = PeriodSchema()
period_list_schema = PeriodSchema(many=True)


class Period(Resource):

    @classmethod
    @token_required
    def get(cls, name: str):
        period = PeriodModel.find_by_name(name)
        if period:
            return period_schema.dump(period), 200

        return {"message": "Period not found"}, 404


class PeriodList(Resource):
    @classmethod
    @token_required
    def get(cls):
        page = 1 if (request.args.get("page") is None or request.args.get("page") == 0) \
            else int(request.args.get("page")) + 1
        size = 10 if request.args.get("page") is None else int(request.args.get("size"))
        return {"periods": period_list_schema.dump(PeriodModel.find_all())}, 200
        #return {"periods": period_list_schema.dump(PeriodModel.find_all())}, 200
