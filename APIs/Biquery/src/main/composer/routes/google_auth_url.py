from main.factories import google_auth
from main.config.env import read_env
from presentation.routers.google_auth_url import route

def compose():
    env_vars = read_env()
    auth_builder = google_auth.GoogleAuthBuilder().with_scope([
        "*/userinfo.email",
        "*/userinfo.profile",
        "*/bigquery.readonly",
        "openid"
    ])

    return route(auth_builder, auth_url=env_vars["GOOGLE_AUTH_URL"])