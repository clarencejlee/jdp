from sanic import Blueprint

from main.composer.routes import list_projects, list_datasets, list_tables, \
    import_data, notificator, list_imported_datasets, load_dataset

def setup(app):
    api_blueprint = Blueprint('api', '/api')

    api_blueprint.add_route(list_projects.compose(), '/projects')
    api_blueprint.add_route(list_datasets.compose(), '/projects/<projectId>/datasets')
    api_blueprint.add_route(list_tables.compose(), '/projects/<projectId>/datasets/<datasetId>/tables')
    api_blueprint.add_route(import_data.compose(), '/import', methods=['POST'])

    api_blueprint.add_route(list_imported_datasets.compose(), '/datasets')
    api_blueprint.add_route(load_dataset.compose(), '/datasets/<id>')

    api_blueprint.add_websocket_route(notificator.compose(), '/notifications/<channel_name>')

    app.blueprint(api_blueprint)
