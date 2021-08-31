from sanic.response import json


class BigQueryProvider:
    __base_url = "https://bigquery.googleapis.com/bigquery/v2"
    __provider_id = "bigquery"

    def __init__(self, google_client):
        self.google_client = google_client

    def get_provider(self):
        return BigQueryProvider.__provider_id

    async def list_projects(self, token=""):
        endpoint = f'{BigQueryProvider.__base_url}/projects'
        client = self.google_client.build()

        response = await client.get(url=endpoint, headers={ 'Authorization': f'OAuth {token.get("access_token")}'})
        json_response = await response.json()

        return json_response.get('projects')
    
    async def list_datasets(self, projectId, token=""):
        endpoint = f'{BigQueryProvider.__base_url}/projects/{projectId}/datasets'
        client = self.google_client.build()

        response = await client.get(url=endpoint, headers={ 'Authorization': f'OAuth {token.get("access_token")}'})
        json_response = await response.json()

        return json_response.get('datasets')
    
    async def list_tables(self, projectId, datasetId, token = ""):
        endpoint = f'{BigQueryProvider.__base_url}/projects/{projectId}/datasets/{datasetId}/tables'
        client = self.google_client.build()

        response = await client.get(url=endpoint, headers={ 'Authorization': f'OAuth {token.get("access_token")}'})
        json_response = await response.json()

        return json_response.get('tables')
    
    async def get_schema(self, id, token=""):
        projectId, datatable = id.split(":")
        datasetId, tableId = datatable.split(".")

        endpoint = f'{BigQueryProvider.__base_url}/projects/{projectId}/datasets/{datasetId}/tables/{tableId}'
        client = self.google_client.build()

        response = await client.get(url=endpoint, headers={ 'Authorization': f'OAuth {token.get("access_token")}'})
        json_response = await response.json()

        return json_response.get('schema')
    
    async def import_data(self, id, token="", maxResults = 1000, startIndex = 0):
        query_index = startIndex if startIndex > 0 else 0
        
        print(f'[BigQueryProvider] - Quering data with id [{id}] starting from index [{query_index}]')

        projectId, datatable = id.split(":")
        datasetId, tableId = datatable.split(".")


        endpoint = f'{BigQueryProvider.__base_url}/projects/{projectId}/datasets/{datasetId}/tables/{tableId}/data?maxResults={maxResults}&startIndex={query_index}'
        client = self.google_client.build()

        response = await client.get(url=endpoint, headers={ 'Authorization': f'OAuth {token.get("access_token")}'})
        json_response = await response.json()

        rows = []

        for row in json_response.get('rows'):
            current_row = []

            for field in row.get('f'):
                current_row.append(field.get('v'))
            
            rows.append(current_row)
        
        total = int(json_response.get('totalRows'))
        more_to_fetch = startIndex + len(rows) < total

        print(f'[BigQueryProvider] - Finished fetching {len(rows)} rows from [{id}]')

        return rows, more_to_fetch
