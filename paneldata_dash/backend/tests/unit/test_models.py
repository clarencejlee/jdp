"""
This file (test_models.py) contains the unit tests for the models.py file.
"""


def test_new_brand(new_brand):
    """
    GIVEN a Brand model
    WHEN a new Brand is created
    THEN check the name, description are defined correctly
    """
    assert new_brand.name == 'Test Brand'
    assert new_brand.description == 'Test Brand'


def test_new_category(new_category):
    """
    GIVEN a Category model
    WHEN a new Category is created
    THEN check the name, description are defined correctly
    """
    assert new_category.name == 'Test Category'
    assert new_category.description == 'Test Category'


def test_new_fact(new_fact):
    """
    GIVEN a Fact model
    WHEN a new Fact is created
    THEN check the name, description are defined correctly
    """
    assert new_fact.name == 'Test Fact'
    assert new_fact.description == 'Test Fact'


def test_new_market(new_market):
    """
    GIVEN a Market model
    WHEN a new Market is created
    THEN check the name, description are defined correctly
    """
    assert new_market.name == 'Test Market'
    assert new_market.description == 'Test Market'


def test_new_period(new_period):
    """
    GIVEN a Period model
    WHEN a new Period is created
    THEN check the name, description are defined correctly
    """
    assert new_period.name == 'Test Period'
    assert new_period.description == 'Test Period'


def test_new_jsd(new_jsd, new_brand, new_category, new_market, new_period):
    """
    GIVEN a Johnson Scanner Data model
    WHEN a new Johnson Scanner Data  is created
    THEN check the name, description are defined correctly
    """
    assert new_jsd.brand == new_brand
    assert new_jsd.category == new_category
    assert new_jsd.market == new_market
    assert new_jsd.period == new_period
    assert new_jsd.retailer == "Test Retailer"
    assert new_jsd.department == 'Test Department'

