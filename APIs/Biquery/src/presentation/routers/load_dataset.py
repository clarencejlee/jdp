from sanic.response import json

def route(dataset_repo, serializer):
    async def handler(request, id):
        pagination_args = request.args
        print(pagination_args)

        offset = pagination_args.get('offset', 0)
        page_size = pagination_args.get('pageSize', 10)

        print(offset, page_size)

        data = await dataset_repo.get_data(id, offset=offset, page_size=page_size)
        details = await dataset_repo.get_by_id(id)

        return json({
            'success': True,
            'dataset': {
                'details': details.serialize(),
                'rows': serializer(data)
            }
        })

    return handler

