import json


def test_get_categories(test_client, init_database):
    """
    GIVEN a Flask application
    WHEN the '/api/v1/categories' api is called
    THEN check the response is valid and the data returned
    """
    response = test_client.get('/api/v1/categories')
    # data = json.loads(response.get_data(as_text=True))
    assert response.status_code == 200
    assert b"categories" in response.data
    assert b"description" in response.data
    assert b"Test Category" in response.data


def test_get_category_by_name(test_client, init_database):
    """
    GIVEN a Flask application
    WHEN the '/api/v1/brand/{name}' api is called
    THEN check the response is valid and the data returned
    """
    response = test_client.get('/api/v1/categories/Test Category')
    # data = json.loads(response.get_data(as_text=True))
    assert response.status_code == 200
    assert b"description" in response.data
    assert b"Test Category" in response.data
