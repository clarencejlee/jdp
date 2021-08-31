from os.path import dirname

from main.config.env import read_env
from presentation.routers.static import route

def compose():
    current_directory = dirname(__file__)
    source_directory = dirname(dirname(dirname(current_directory)))

    template_path = f'{source_directory}/client/login.html'
    template_params = {
        'host': read_env()['BASE_URL']
    }

    return route(template_path, template_params)
