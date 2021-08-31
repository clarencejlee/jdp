import json


def test_get_brands(test_client, init_database):
    """
    GIVEN a Flask application
    WHEN the '/api/v1/brand/Test Brand' api is called
    THEN check the response is valid and the data returned
    """
    response = test_client.get('/api/v1/brands')
    # data = json.loads(response.get_data(as_text=True))

    assert response.status_code == 200
    assert b"brands" in response.data
    assert b"description" in response.data
    assert b"Test Brand" in response.data


def test_get_brand_by_name(test_client, init_database):
    """
    GIVEN a Flask application
    WHEN the '/api/v1/brand/{name}' api is called
    THEN check the response is valid and the data returned
    """
    response = test_client.get('/api/v1/brands/Test Brand')
    # data = json.loads(response.get_data(as_text=True))
    assert response.status_code == 200
    assert b"description" in response.data
    assert b"Test Brand" in response.data
