import time
from os.path import dirname

from infra.providers.credential_provider import SessionCredentialProvider
from main.config.env import read_env
from main.factories import google_auth
from presentation.routers.static_auth import StaticAuth
from presentation.decorators.ensure_authenticated import ensure_authenticated, AuthDecorator

def compose():
    current_directory = dirname(__file__)
    source_directory = dirname(dirname(dirname(current_directory)))

    template_path = f'{source_directory}/client/index.html'
    template_params = {
        'host': read_env()['BASE_URL']
    }

    auth_builder = google_auth.GoogleAuthBuilder().with_scope([
        "*/userinfo.email",
        "*/userinfo.profile",
        "*/bigquery.readonly",
        "openid"
    ])


    static_auth = StaticAuth(template_path, template_params)
    auth_decorator = AuthDecorator(
        oauth_client=auth_builder,
        token_url=read_env()["GOOGLE_TOKEN_URL"],
        time_handler=time,
        client_secret=read_env()["GOOGLE_CLIENT_SECRET"],
        cm=SessionCredentialProvider()
    )

    return auth_decorator.ensure_authenticated(static_auth.route)
    # return ensure_authenticated(static_auth.route)
