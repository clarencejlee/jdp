import asyncio
import uuid

from infra.providers.bigquery_provider import BigQueryProvider
from infra.repositories.datasets_repository import DatasetsRepository
from infra.workers.import_data_worker import ImportDataWorkerBuilder

from main.factories import google_auth
from main.config.env import read_env

from presentation.listeners.import_workers import listener

def compose():
    worker_params = {
        'max_size': int(read_env()['IMPORT_QUEUE_SIZE']),
        'worker_count': int(read_env()['IMPORT_WORKERS'])
    }

    worker_builder = with_worker_builder()

    import_worker = listener(asyncio.Queue, worker_builder, worker_params)

    return import_worker

def with_worker_builder():
    auth_builder = google_auth.GoogleAuthBuilder().with_scope([
        "*/userinfo.email",
        "*/userinfo.profile",
        "*/bigquery.readonly",
        "openid"
    ])

    dataset_repo = DatasetsRepository(uuid)
    data_providers = {
        'bigquery': BigQueryProvider(auth_builder)
    }

    return ImportDataWorkerBuilder()\
        .with_dataset_repo(dataset_repo)\
        .with_providers(data_providers)
