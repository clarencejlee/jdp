import logging

from sanic import Sanic
from sanic_cors import CORS
from sanic_session import Session, InMemorySessionInterface

from main.config import routes, env, listeners
from infra.helpers.mysql_helper import register_db

app = Sanic(__name__)
session = Session(app, interface=InMemorySessionInterface())

logging.getLogger('asyncio').setLevel(logging.CRITICAL)

env.config_env()
register_db(app)
listeners.register_listeners(app)
routes.load_routes(app)
# CORS(app)
