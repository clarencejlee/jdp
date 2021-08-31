from main.factories import notificator

from presentation.decorators.ensure_authenticated import ensure_authenticated
from presentation.sockets.notificator import route

def compose():
    notificator_socket = route(notificator)

    return ensure_authenticated(notificator_socket)
