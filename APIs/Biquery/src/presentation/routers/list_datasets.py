from sanic.response import json

def route(bigquery_client, credential_manager):
    async def handler(request, projectId):
        token = credential_manager.get_credentials(request)
        datasets = await bigquery_client.list_datasets(projectId, token)

        return json({ 'datasets': datasets })

    return handler
