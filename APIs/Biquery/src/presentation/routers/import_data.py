from sanic.response import json

def route(data_provider, credential_manager, dataset_repo):
    async def handler(request):
        body = request.json

        provider = data_provider[body.get('provider')]
        data_id = body.get('id')

        token = credential_manager.get_credentials(request)

        dataset = await dataset_repo.get_by_provider_info(provider.get_provider(), data_id)
        
        if (dataset is None):
            print('Creating data set...')
            schema = await provider.get_schema(data_id, token)
            dataset = await dataset_repo.create_dataset(
                provider.get_provider(), 
                data_id, 
                body.get('datasetName'), 
                schema
            )
        else:
            print('Dataset already exists...')

        message = {
            'provider': {
                'name': body.get('provider'),
                'data_id': data_id
            },
            'dataset': {
                'id': dataset.id,
                'size': dataset.size
            },
            'token': token
        }
     
        await request.app.import_queue.put(message)

        return json({
            'success': True,
            'dataset': dataset.serialize()
        })

    return handler

