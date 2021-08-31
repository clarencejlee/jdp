import json


def test_get_periods(test_client, init_database):
    """
    GIVEN a Flask application
    WHEN the '/api/v1/periods' api is called
    THEN check the response is valid and the data returned
    """
    response = test_client.get('/api/v1/periods')
    # data = json.loads(response.get_data(as_text=True))
    assert response.status_code == 200
    assert b"periods" in response.data
    assert b"description" in response.data
    assert b"Test Period" in response.data


def test_get_period_by_name(test_client, init_database):
    """
    GIVEN a Flask application
    WHEN the '/api/v1/period/{name}' api is called
    THEN check the response is valid and the data returned
    """
    response = test_client.get('/api/v1/periods/Test Period')
    # data = json.loads(response.get_data(as_text=True))
    assert response.status_code == 200
    assert b"description" in response.data
    assert b"Test Period" in response.data
