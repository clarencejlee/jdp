import os

DEBUG = True

#SQLALCHEMY_DATABASE_URI = 'mysql://{}:{}@localhost:3306/mc_panel'.format(os.environ['DB_USERNAME'],
 #                                                                       os.environ['DB_PASSWORD'])
SQLALCHEMY_DATABASE_URI = 'sqlite:///data.db'
SECRET_KEY = os.environ['APP_SECRET_KEY']
SQLALCHEMY_TRACK_MODIFICATIONS = False
PROPAGATE_EXCEPTIONS = True
JWT_SECRET_KEY = os.environ['JWT_SECRET_KEY']
JWT_BLACKLIST_ENABLED = True
JWT_BLACKLIST_TOKEN_CHECKS = ['access', 'refresh']

