from flask import request
from flask_restful import Resource

from libs.auth_helper import token_required
from models.market import MarketModel
from schemas.market import MarketSchema

market_schema = MarketSchema()
market_list_schema = MarketSchema(many=True)


class Market(Resource):
    @classmethod
    @token_required
    def get(cls, name: str):
        market = MarketModel.find_by_name(name)
        if market:
            return market_schema.dump(market), 200

        return {"message": "Market not found"}, 404


class MarketList(Resource):
    @classmethod
    @token_required
    def get(cls):
        page = 1 if (request.args.get("page") is None or request.args.get("page") == 0) \
            else int(request.args.get("page")) + 1
        size = 10 if request.args.get("size") is None else int(request.args.get("size"))
        return {"markets": market_list_schema.dump(MarketModel.find_all())}, 200
