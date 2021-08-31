from tortoise import Tortoise
from main.config.app import session
from sanic.response import json

def route(bigquery_client, credential_manager):
    async def handler(request):
        token = credential_manager.get_credentials(request)
        projects = await bigquery_client.list_projects(token)

        return json({ 'projects': projects })

    return handler
