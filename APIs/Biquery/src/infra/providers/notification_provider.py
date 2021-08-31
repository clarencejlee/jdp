import json
import asyncio
from websockets.exceptions import ConnectionClosed


class Notificator(object):
    def __init__(self, app, feed_name):
        self.name = feed_name
        self.app = app
        self.clients = set()

    def __len__(self):
        return len(self.clients)

    async def run(self, client):
        await self._subscribe(client)
        tasks = self.get_tasks(client)
        await asyncio.wait(tasks)

    def get_tasks(self, client):
        producer_task = asyncio.ensure_future(self._producer_handler())

        return [producer_task]

    async def _producer_handler(self):
        print('')
        print('producer_handler')
        while True:
            message = await self.app.notification_queue.get()
            if message:
                await self._broadcast(message)
            await asyncio.sleep(1)

    async def _broadcast(self, message):
        print('broadcasting to {} clients:'.format(len(self.clients)), message)
        data = self._publishable(message.get('data', None))
        for client in self.clients:
            try:
                await client.send(data)
            except ConnectionClosed:
                print('closing connection')
                self._leave(client)

    def _leave(self, client):
        try:
            self.clients.remove(client)
        except ValueError:
            pass

    async def _subscribe(self, client):
        # await self.app.pubsub.subscribe(self.name)
        self.clients.add(client)

    def _publishable(self, raw):
        if raw is None:
            return ''
        if isinstance(raw, str):
            return raw
        else:
            return json.dumps(raw)