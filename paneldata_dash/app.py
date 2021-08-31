from flask import Flask, jsonify
from flask_restful import Api

# from flask_jwt import JWT
from flask_jwt_extended import JWTManager
from flask_migrate import Migrate
from dotenv import load_dotenv

from resources.feedback import Feedback
from resources.johnson_scanner_data import JohnsonScannerDataList, JohnsonScannerDataCSVParse, \
    JohnsonScannerDataCSVExport, JohnsonScannerDataCustomQuery, JohnsonScannerDataCustomQueryCsvExport

load_dotenv('.env', verbose=True)

from db import db  # circular imports flask
from ma import ma
from marshmallow import ValidationError
from flask import jsonify
from resources.brand import Brand, BrandList
from resources.category import Category, CategoryList
from resources.fact import Fact, FactList
from resources.market import Market, MarketList
from resources.period import Period, PeriodList

app = Flask(__name__)
app.config.from_object('default_config')
app.config.from_envvar('APPLICATION_SETTINGS')
api = Api(app)

migrate = Migrate(app, db)
# jwt = JWT(app, authenticate, identity) #/auth
jwt = JWTManager(app)  # /not creating /auth


@app.before_first_request
def create_tables():
    db.create_all()


@app.after_request
def after_request(response):
    header = response.headers
    header['Access-Control-Allow-Origin'] = '*'
    return response


@app.after_request
def session_commit(response):
    if 200 <= response.status_code <= 300:
        try:
            db.session.commit()
        except Exception:
            db.session.rollback()
            raise
    return response


@app.errorhandler(ValidationError)
def handle_marshmallow_validation(err):
    return jsonify(err.messages), 400


# csv types
api.add_resource(BrandList, "/api/v1/brands")
api.add_resource(Brand, "/api/v1/brands/<string:name>")
api.add_resource(CategoryList, "/api/v1/categories")
api.add_resource(Category, "/api/v1/categories/<string:name>")
api.add_resource(FactList, "/api/v1/facts")
api.add_resource(Fact, "/api/v1/facts/<string:name>")
api.add_resource(MarketList, "/api/v1/markets")
api.add_resource(Market, "/api/v1/markets/<string:name>")
api.add_resource(PeriodList, "/api/v1/periods")
api.add_resource(Period, "/api/v1/periods/<string:name>")

# data api
api.add_resource(JohnsonScannerDataList, "/api/v1/data")
api.add_resource(JohnsonScannerDataCSVExport, "/api/v1/data/csv/export")
api.add_resource(JohnsonScannerDataCSVParse, "/api/v1/data/csv/upload")
api.add_resource(JohnsonScannerDataCustomQuery, "/api/v1/data/query/<string:query>")
api.add_resource(JohnsonScannerDataCustomQueryCsvExport, "/api/v1/data/query/<string:query>/csv/export")

# feedback
api.add_resource(Feedback, "/api/v1/feedback")

db.init_app(app)
if __name__ == "__main__":
    ma.init_app(app)
    app.run(port=5000)
