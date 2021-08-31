from sanic.response import json

def route(bigquery_client, credential_manager):
    async def handler(request, projectId, datasetId):
        token = credential_manager.get_credentials(request)
        tables = await bigquery_client.list_tables(projectId, datasetId, token)

        # schema = await bigquery_client.get_schema("micro-rigging-319313:baseball.schedule", token)
        # await dataset_repo.create_dataset(
        #     bigquery_client.get_provider(), 
        #     "micro-rigging-319313:baseball.games_post_wide", 
        #     "games_post_wide", 
        #     schema
        # )

        return json({ 'tables': tables })

    return handler
