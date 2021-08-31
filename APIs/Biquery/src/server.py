import tortoise

from infra.helpers.mysql_helper import register_db
from main.config.app import app

if __name__ == '__main__':
    app.run(port=3000, debug=True)
