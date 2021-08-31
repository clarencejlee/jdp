import json


def test_get_facts(test_client, init_database):
    """
    GIVEN a Flask application
    WHEN the '/api/v1/facts' api is called
    THEN check the response is valid and the data returned
    """
    response = test_client.get('/api/v1/facts')
    # data = json.loads(response.get_data(as_text=True))
    assert response.status_code == 200
    assert b"facts" in response.data
    assert b"description" in response.data
    assert b"Test Fact" in response.data


def test_get_fact_by_name(test_client, init_database):
    """
    GIVEN a Flask application
    WHEN the '/api/v1/facts/{name}' api is called
    THEN check the response is valid and the data returned
    """
    response = test_client.get('/api/v1/facts/Test Fact')
    # data = json.loads(response.get_data(as_text=True))
    assert response.status_code == 200
    assert b"description" in response.data
    assert b"Test Fact" in response.data
