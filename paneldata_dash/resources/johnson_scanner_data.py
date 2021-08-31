import codecs
import io
import csv
from datetime import datetime

from flask import request, make_response
from flask_restful import Resource

from db import db
from libs.csv_parser_helper import parse_data_from_csv, parse_metadata_from_csv
from models import PeriodModel, MarketModel, CategoryModel, FactModel, BrandModel
from models.johnson_scanner_data import JohnsonScannerDataModel, FactsInData
from schemas.brand import BrandSchema
from schemas.category import CategorySchema
from schemas.fact import FactSchema
from schemas.johnson_scanner_data import JohnsonScannerDataSchema
from schemas.market import MarketSchema
from schemas.period import PeriodSchema
from schemas.sql_schema import SQLSchema

brand_list_schema = BrandSchema(many=True)
category_list_schema = CategorySchema(many=True)
fact_list_schema = FactSchema(many=True)
johnson_scanner_data_list_schema = JohnsonScannerDataSchema(many=True)
market_list_schema = MarketSchema(many=True)
period_list_schema = PeriodSchema(many=True)

sql_list_schema = SQLSchema(many=True)


class JohnsonScannerDataList(Resource):
    @classmethod
    def get(cls):
        page = 1 if (request.args.get("page") is None or request.args.get("page") == 0) \
            else int(request.args.get("page")) + 1
        size = 10 if request.args.get("page") is None else int(request.args.get("size"))
        return {"data": johnson_scanner_data_list_schema.dump(
            JohnsonScannerDataModel.find_all_paginate(page, size))}, 200

    @classmethod
    def delete(cls):
        FactsInData.delete_all()
        JohnsonScannerDataModel.delete_all()
        PeriodModel.delete_all()
        MarketModel.delete_all()
        CategoryModel.delete_all()
        FactModel.delete_all()
        BrandModel.delete_all()

        return {"message": "All data removed"}, 200


class JohnsonScannerDataCustomQuery(Resource):
    @classmethod
    def get(cls, query: str):
        filtered_query = query.lower()
        if "delete" in filtered_query or "update" in filtered_query or "drop" in filtered_query:
            return {"error": "Invalid query"}

        if "select" not in filtered_query:
            return {"error": "Not a select statement"}

        try:
            result = db.session.execute(filtered_query)
            # decide based on the table which schema

            return sql_list_schema.dump(result)

        except Exception as e:
            print(e)
            return {"error": "Error fetching data"}, 500


class JohnsonScannerDataCustomQueryCsvExport(Resource):
    @classmethod
    def get(cls, query: str):
        filtered_query = query.lower()
        if "delete" in filtered_query or "update" in filtered_query or "drop" in filtered_query:
            return {"error": "Invalid query"}

        if "select" not in filtered_query:
            return {"error": "Not a select statement"}

        try:
            connection = db.engine.raw_connection()
            c = connection.cursor()
            c.execute(filtered_query)
            rows = c.fetchall()
            si = io.StringIO()
            cw = csv.writer(si)
            cw.writerow([i[0] for i in c.description])
            cw.writerows(rows)
            response = make_response(si.getvalue())
            response.headers['Content-Disposition'] = 'attachment; filename=report - ' + str(datetime.now()) + '.csv'
            response.headers["Content-type"] = "text/csv"
            return response
        except Exception as e:
            print(e)
            return {"error": "Error exporting CSV  data"}, 500


class JohnsonScannerDataCSVExport(Resource):
    """
    Generate CSV file based on received filters
    """
    @classmethod
    def get(cls):
        markets = [] if request.args.get('markets') is None else [x.strip() for x in request.args.get('markets').split(',')]
        categories = [] if request.args.get('categories') is None else [x.strip() for x in request.args.get('categories').split(',')]
        brands = [] if request.args.get('brands') is None else [x.strip() for x in request.args.get('brands').split(',')]
        periods = [] if request.args.get('periods') is None else [x.strip() for x in request.args.get('periods').split(',')]
        facts = [] if request.args.get('facts') is None else [x.strip() for x in request.args.get('facts').split(',')]

        header = ['Market', 'Retailer', 'Department', 'Category', 'Brand', 'Period (4we)']
        facts = FactModel.find_all_filtered(facts)
        header = header + [f.name for f in facts]
        data = [header]
        jsd = JohnsonScannerDataModel.find_all_filtered(markets, categories, brands, periods)

        for item in jsd:
            temp = [
                item.market.name,
                'All Outlets',
                'BEVERAGES',
                item.category.name,
                item.brand.name,
                item.period.name
            ]
            temp += [f.value for f in item.facts if f.fact.name in header]
            data.append(temp)

        si = io.StringIO()
        cw = csv.writer(si)
        cw.writerows(data)
        output = make_response(si.getvalue())
        output.headers["Content-Disposition"] = "attachment; filename=mc_panel - " + str(datetime.now()) + ".csv"
        output.headers["Content-type"] = "text/csv"
        return output


class JohnsonScannerDataCSVParse(Resource):
    """
    Expect a valid csv file to parse
    """
    @classmethod
    def post(cls):
        flask_file = request.files['file']
        if not flask_file:
            return {"error": "Upload a CSV file"}, 400

        data = []
        stream = codecs.iterdecode(flask_file.stream, 'utf-8')
        for row in csv.reader(stream, dialect=csv.excel):
            if row:
                data.append(row)

        if len(data) == 0:
            return {"error": "Uploaded empty CSV file"}, 400

        # get old data from db and compare if there are any new columns in the csv and store
        old_fact_data = FactModel.find_all()
        old_market_data = MarketModel.find_all()
        old_category_data = CategoryModel.find_all()
        old_brand_data = BrandModel.find_all()
        old_period_data = PeriodModel.find_all()

        try:
            fact_data, market_data, category_data, brand_data, period_data = parse_metadata_from_csv(data)

            # remove duplicates from data
            market_data = [x for x in market_data if x not in [m.name for m in old_market_data]]
            category_data = [x for x in category_data if x not in [c.name for c in old_category_data]]
            brand_data = [x for x in brand_data if x not in [b.name for b in old_brand_data]]
            period_data = [x for x in period_data if x not in [p.name for p in old_period_data]]
            fact_data = [x for x in fact_data if x not in [f.name for f in old_fact_data]]

            # store all of them
            for item in market_data:
                market = MarketModel(name=item)
                market.save_to_db()

            for item in category_data:
                cat = CategoryModel(name=item)
                cat.save_to_db()

            for item in brand_data:
                brand = BrandModel(name=item)
                brand.save_to_db()

            for item in period_data:
                period = PeriodModel(name=item)
                period.save_to_db()

            for item in fact_data:
                fact = FactModel(name=item)
                fact.save_to_db()

            # after saving get all data so we can reference ids to scanner data.
            fact_data = FactModel.find_all()
            market_data = MarketModel.find_all()
            category_data = CategoryModel.find_all()
            brand_data = BrandModel.find_all()
            period_data = PeriodModel.find_all()

            # parse date and get list of scanner data
            jsd = parse_data_from_csv(data, fact_data, market_data, category_data, brand_data, period_data)

            for item in jsd:
                item.save_to_db()

        except Exception as e:
            print(e)
            return {"error": "Error storing data from the CSV"}, 500

        return {"message": "File uploaded successfully"}, 200
