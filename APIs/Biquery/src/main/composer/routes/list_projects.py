import time

from main.factories import google_auth
from main.config.env import read_env

from infra.providers.bigquery_provider import BigQueryProvider
from infra.providers.credential_provider import SessionCredentialProvider

from presentation.decorators.ensure_authenticated import AuthDecorator, ensure_authenticated
from presentation.routers.list_projects import route

def compose():
    auth_builder = google_auth.GoogleAuthBuilder().with_scope([
        "*/userinfo.email",
        "*/userinfo.profile",
        "*/bigquery.readonly",
        "openid"
    ])

    credential_manager = SessionCredentialProvider()
    auth_decorator = AuthDecorator(
        oauth_client=auth_builder,
        token_url=read_env()["GOOGLE_TOKEN_URL"],
        time_handler=time,
        client_secret=read_env()["GOOGLE_CLIENT_SECRET"],
        cm=credential_manager
    )

    bigquery_provider = BigQueryProvider(auth_builder)
    list_project = route(bigquery_provider, credential_manager)

    # return list_project
    return ensure_authenticated(list_project)
