import json


def test_get_jsd(test_client, init_database):
    """
    GIVEN a Flask application
    WHEN the '/api/v1/data' api is called
    THEN check the response is valid and the data returned
    """
    response = test_client.get('/api/v1/data')
    # data = json.loads(response.get_data(as_text=True))
    assert response.status_code == 200
    assert b"facts" in response.data
    assert b"description" in response.data
    assert b"Test Brand" in response.data
    assert b"Test Category" in response.data
    assert b"Test Period" in response.data
    assert b"Test Department" in response.data
    assert b"Test Retailer" in response.data


def test_export_csv_jsd(test_client, init_database):
    """
    GIVEN a Flask application
    WHEN the '/api/v1/data/csv/download' api is called
    THEN check the response is valid and the data returned
    """
    params = 'markets=Total%20US&brands=C%20D%20M&categories=DRY%20COFFEE&facts=$&periods=11/4/17'
    response = test_client.get('/api/v1/data/csv/export?' + params)
    print(response.data)
    assert response.status_code == 200
    assert b"Market,Retailer,Department,Category,Brand,Period" in response.data


def test_custom_query_data(test_client, init_database):
    """
    GIVEN a Flask application
    WHEN the '/api/v1/data/query' api is called
    THEN check the response is valid and the data returned
    """
    query = "select * from brands"
    response = test_client.get('/api/v1/data/query/' + query)
    assert response.status_code == 200
    assert b"Test Brand" in response.data

    query = "select * from categories"
    response = test_client.get('/api/v1/data/query/' + query)
    assert response.status_code == 200
    assert b"Test Category" in response.data

    query = "select * from facts"
    response = test_client.get('/api/v1/data/query/' + query)
    assert response.status_code == 200
    assert b"Test Fact" in response.data

    query = "select * from markets"
    response = test_client.get('/api/v1/data/query/' + query)
    assert response.status_code == 200
    assert b"Test Market" in response.data

    query = "select * from periods"
    response = test_client.get('/api/v1/data/query/' + query)
    assert response.status_code == 200
    assert b"Test Period" in response.data

    query = "select * from johnson_scanner_data"
    response = test_client.get('/api/v1/data/query/' + query)
    assert response.status_code == 200
    assert b"Test Department" in response.data


def test_custom_query_data_error(test_client, init_database):
    """
    GIVEN a Flask application
    WHEN the '/api/v1/data/query' api is called
    THEN check the response is valid and the data returned
    """
    query = "delete from brands"
    response = test_client.get('/api/v1/data/query/' + query)
    assert response.status_code == 200
    assert b"Invalid query" in response.data

    query = "drop table brands"
    response = test_client.get('/api/v1/data/query/' + query)
    assert response.status_code == 200
    assert b"Invalid query" in response.data

    query = "update table brands set name = 'test'"
    response = test_client.get('/api/v1/data/query/' + query)
    assert response.status_code == 200
    assert b"Invalid query" in response.data

    query = "show processlist"
    response = test_client.get('/api/v1/data/query/' + query)
    assert response.status_code == 200
    assert b"Not a select statement" in response.data


def test_delete_jsd(test_client, init_database):
    """
    GIVEN a Flask application
    WHEN the '/api/v1/data' api is called
    THEN check the response is valid and the data returned
    """
    response = test_client.delete('/api/v1/data')
    # data = json.loads(response.get_data(as_text=True))
    assert response.status_code == 200
    assert b"All data removed" in response.data


