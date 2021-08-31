from os.path import join, dirname, exists
from os import environ
from dotenv import load_dotenv

from utils.find_file import find

__env = {}

def read_env():
    return __env

def config_env(filename='.env', key_identifier='APP_'):
    envpath = find(filename)

    if (envpath == '/'):
        return

    load_dotenv(f'{envpath}/{filename}')

    for key, value in environ.items():
        if (key.startswith(key_identifier)):
            _, name = key.split(key_identifier)
            __env[name] = value
