from importlib import import_module
from os import path, listdir

from tortoise import Tortoise

def load_routes(app):
    dir_name = 'routes'
    mod_name = f'main.{dir_name}'

    current_directory = path.dirname(__file__)
    parent_directory = path.dirname(current_directory)
    routes_directory = path.join(parent_directory, dir_name)
        
    for d in listdir(routes_directory):
        if (d.endswith(".py")):
            route_name = d.split(".")[0]
            mod = import_module(f'{mod_name}.{route_name}')
            route_setup = getattr(mod, 'setup')

            route_setup(app)