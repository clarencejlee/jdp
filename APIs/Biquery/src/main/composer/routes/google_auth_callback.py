from infra.providers.credential_provider import SessionCredentialProvider

from main.factories import google_auth
from main.config.env import read_env
from presentation.routers.google_auth_callback import route

def compose():
    env_vars = read_env()
    auth_builder = google_auth.GoogleAuthBuilder().with_scope([
        "*/userinfo.email",
        "*/userinfo.profile",
        "*/bigquery.readonly",
        "openid"
    ])

    credential_manager = SessionCredentialProvider()

    return route(
        auth_builder,
        credential_manager,
        token_url=env_vars["GOOGLE_TOKEN_URL"],
        client_secret=env_vars["GOOGLE_CLIENT_SECRET"]
    )