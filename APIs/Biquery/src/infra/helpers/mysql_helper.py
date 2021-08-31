import ssl

from os import path, listdir
from tortoise.contrib.sanic import register_tortoise

from main.config.env import read_env
from utils.find_file import find

def __with_certificate(filename):
    cert_path = find(filename)
    ctx = ssl.create_default_context(cafile=f'{cert_path}/{filename}')

    return ctx

def __load_models():
    dir_name = 'models'
    mod_name = f'infra.{dir_name}'

    current_directory = path.dirname(__file__)
    parent_directory = path.dirname(current_directory)
    models_directory = path.join(parent_directory, dir_name)

    models = []
    for d in listdir(models_directory):
        if (d.endswith(".py")):
            model_name = d.split(".")[0]

            models.append(f'{mod_name}.{model_name}')

    return models

def register_db(app):
    cert_file_name = 'mysql.pem'
    ctx = __with_certificate(cert_file_name)

    env_ctx = read_env()

    

    config = {
        "connections": {
            "default": {
                "engine": "tortoise.backends.mysql",
                "credentials": {
                    "database": env_ctx['MYSQL_DATABASE'],
                    "host": env_ctx['MYSQL_HOST'],
                    "password": env_ctx['MYSQL_PASSWORD'],
                    "port": env_ctx['MYSQL_PORT'],
                    "user": env_ctx['MYSQL_USER'],
                    "ssl": ctx  # Here we pass in the SSL context
                }
            }
        },
        "apps": {
            "models": {
                "models": __load_models(),
                "default_connection": "default",
            }
        },
    }

    register_tortoise(
        app, 
        config=config
    )