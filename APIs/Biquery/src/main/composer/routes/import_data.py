import uuid

from main.factories import google_auth
from main.config.env import read_env

from infra.providers.bigquery_provider import BigQueryProvider
from infra.providers.credential_provider import SessionCredentialProvider
from infra.repositories.datasets_repository import DatasetsRepository

from presentation.decorators.ensure_authenticated import ensure_authenticated
from presentation.routers.import_data import route

def compose():
    auth_builder = google_auth.GoogleAuthBuilder().with_scope([
        "*/userinfo.email",
        "*/userinfo.profile",
        "*/bigquery.readonly",
        "openid"
    ])

    dataset_repo = DatasetsRepository(uuid)
    credential_manager = SessionCredentialProvider()

    data_providers = {
        'bigquery': BigQueryProvider(auth_builder)
    }

    list_tables = route(data_providers, credential_manager, dataset_repo)

    # return list_project
    return ensure_authenticated(list_tables)
