from sanic.response import json

def route(notificator_factory):
    async def handler(request, ws, channel_name):
        print(f'The channel_name: {channel_name}')

        notificator = notificator_factory.get_notificator(channel_name, request.app)
        await notificator.run(ws)

    return handler
