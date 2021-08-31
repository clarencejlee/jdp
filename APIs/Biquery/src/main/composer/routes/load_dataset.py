import uuid

from infra.repositories.datasets_repository import DatasetsRepository

from presentation.decorators.ensure_authenticated import ensure_authenticated
from presentation.routers.load_dataset import route

from utils.serialize_imported_data import serialize

def compose():
    dataset_repo = DatasetsRepository(uuid)

    load_dataset = route(dataset_repo, serialize)

    return ensure_authenticated(load_dataset)
