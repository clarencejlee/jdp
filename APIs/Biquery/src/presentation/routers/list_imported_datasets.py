from sanic.response import json

def route(dataset_repo):
    async def handler(request):
        dataset_list = await dataset_repo.list_datasets()

        return json({
            'success': True,
            'datasets': list(map(lambda x: x.serialize(), dataset_list))
        })

    return handler

