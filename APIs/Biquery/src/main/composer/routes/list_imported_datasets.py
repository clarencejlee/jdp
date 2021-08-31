import uuid

from infra.repositories.datasets_repository import DatasetsRepository

from presentation.decorators.ensure_authenticated import ensure_authenticated
from presentation.routers.list_imported_datasets import route

def compose():
    dataset_repo = DatasetsRepository(uuid)

    list_imported_datasets = route(dataset_repo)

    return ensure_authenticated(list_imported_datasets)
