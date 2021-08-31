import pytest

from ma import ma
from db import db
from models import CategoryModel, FactModel, MarketModel, PeriodModel, BrandModel, JohnsonScannerDataModel
from app import app
from models.johnson_scanner_data import FactsInData


@pytest.fixture(scope='module')
def new_brand():
    brand = BrandModel(name='Test Brand', description='Test Brand')
    return brand


@pytest.fixture(scope='module')
def new_category():
    category = CategoryModel(name='Test Category', description='Test Category')
    return category


@pytest.fixture(scope='module')
def new_fact():
    fact = FactModel(name='Test Fact', description='Test Fact')
    return fact


@pytest.fixture(scope='module')
def new_market():
    market = MarketModel(name='Test Market', description='Test Market')
    return market


@pytest.fixture(scope='module')
def new_period():
    period = PeriodModel(name='Test Period', description='Test Period')
    return period


@pytest.fixture(scope='module')
def new_jsd(new_brand, new_category, new_market, new_period):
    jsd = JohnsonScannerDataModel(brand=new_brand, category=new_category,
                                  market=new_market, period=new_period,
                                  retailer='Test Retailer', department='Test Department')
    return jsd


@pytest.fixture(scope='module')
def init_database():
    # Create the database and the database table
    # app.config.from_object('test_config')
    # db.init_app(app)
    ma.init_app(app)
    db.create_all()

    # Insert  data
    brand = BrandModel(name='Test Brand')
    category = CategoryModel(name='Test Category')
    fact = FactModel(name='Test Fact')
    market = MarketModel(name='Test Market')
    period = PeriodModel(name='Test Period')
    fact_in_jsd = FactsInData(fact=fact, value=5)
    facts_in_jsd = [fact_in_jsd]
    jsd = JohnsonScannerDataModel(brand=brand, category=category, facts=facts_in_jsd, market=market, period=period,
                                  retailer="Test Retailer", department="Test Department")
    db.session.add(brand)
    db.session.add(category)
    db.session.add(fact)
    db.session.add(market)
    db.session.add(period)
    db.session.add(fact_in_jsd)
    db.session.add(jsd)

    # Commit the changes for the data
    db.session.commit()

    yield db  # this is where the testing happens!

    db.drop_all()


@pytest.fixture(scope='module')
def test_client():

    # Flask provides a way to test your application by exposing the Werkzeug test Client
    # and handling the context locals for you.
    testing_client = app.test_client()

    # Establish an application context before running the tests.
    ctx = app.app_context()
    ctx.push()

    yield testing_client  # this is where the testing happens!

    ctx.pop()

