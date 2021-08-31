from sanic import Blueprint
from sanic.response import json

from main.composer.routes import google_auth_url, google_auth_callback

def setup(app):
    auth_blueprint = Blueprint('auth', '/auth')

    auth_blueprint.add_route(google_auth_url.compose(), '/google/url')
    auth_blueprint.add_route(google_auth_callback.compose(), '/google/callback')

    app.blueprint(auth_blueprint)