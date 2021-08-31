from sanic import Blueprint

from main.composer.routes import static_login, static_index, static_dataset

def setup(app):
    client_blueprint = Blueprint('client', '/')

    # Use this route for authenticated users only   
    # Add middleware that checks permission granted 
    client_blueprint.add_route(static_login.compose(), '/login')
    client_blueprint.add_route(static_dataset.compose(), '/dataset/<id>')

    client_blueprint.add_route(static_index.compose(), '/')

    app.blueprint(client_blueprint)
