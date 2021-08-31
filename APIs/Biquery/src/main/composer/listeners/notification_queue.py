import asyncio

from main.config.env import read_env

from presentation.listeners.queue_creator import listener

def compose():
    queue_params = {
        'max_size': int(read_env()['IMPORT_QUEUE_SIZE']),
    }

    queue_name = 'notification_queue'
    notificator_queue = listener(asyncio.Queue, queue_params, queue_name)

    return notificator_queue