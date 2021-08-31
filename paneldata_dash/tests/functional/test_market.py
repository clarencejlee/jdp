import json


def test_get_markets(test_client, init_database):
    """
    GIVEN a Flask application
    WHEN the '/api/v1/markets' api is called
    THEN check the response is valid and the data returned
    """
    response = test_client.get('/api/v1/markets')
    # data = json.loads(response.get_data(as_text=True))
    assert response.status_code == 200
    assert b"markets" in response.data
    assert b"description" in response.data
    assert b"Test Market" in response.data


def test_get_market_by_name(test_client, init_database):
    """
    GIVEN a Flask application
    WHEN the '/api/v1/market/{name}' api is called
    THEN check the response is valid and the data returned
    """
    response = test_client.get('/api/v1/markets/Test Market')
    # data = json.loads(response.get_data(as_text=True))
    assert response.status_code == 200
    assert b"description" in response.data
    assert b"Test Market" in response.data
