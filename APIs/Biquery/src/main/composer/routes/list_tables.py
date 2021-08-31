import time
import uuid

from main.factories import google_auth
from main.config.env import read_env

from infra.providers.bigquery_provider import BigQueryProvider
from infra.providers.credential_provider import SessionCredentialProvider
from infra.repositories.datasets_repository import DatasetsRepository

from presentation.decorators.ensure_authenticated import ensure_authenticated
from presentation.routers.list_tables import route

def compose():
    auth_builder = google_auth.GoogleAuthBuilder().with_scope([
        "*/userinfo.email",
        "*/userinfo.profile",
        "*/bigquery.readonly",
        "openid"
    ])

    credential_manager = SessionCredentialProvider()

    bigquery_provider = BigQueryProvider(auth_builder)
    list_tables = route(bigquery_provider, credential_manager)

    # return list_project
    return ensure_authenticated(list_tables)
