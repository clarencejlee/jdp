import os
from urllib.parse import urlparse
from functools import wraps

from flask import jsonify, request

from onelogin.saml2.auth import OneLogin_Saml2_Auth

from models import UserModel


def init_saml_auth(req):
    auth = OneLogin_Saml2_Auth(req,
                               custom_base_path=os.path.join(os.path.dirname(os.path.abspath(__file__)), '../saml'))
    return auth


def prepare_flask_request(request):
    # If server is behind proxys or balancers use the HTTP_X_FORWARDED fields
    url_data = urlparse(request.url)
    return {
        'https': 'on' if request.scheme == 'https' else 'off',
        'http_host': request.host,
        'server_port': url_data.port,
        'script_name': request.path,
        'get_data': request.args.copy(),
        # Uncomment if using ADFS as IdP, https://github.com/onelogin/python-saml/pull/144
        # 'lowercase_urlencoding': True,
        'post_data': request.form.copy()
    }


def token_required(f):
    @wraps(f)
    def decorator(*args, **kwargs):

        token = None

        if 'Authorization' in request.headers:
            token = request.headers['Authorization']

        if not token:
            return {"message": "a valid token is missing"}, 401

        try:
            user = UserModel.find_by_username(token)
            if not user:
                raise ValueError('Valid token is missing')
        except Exception as e:
            return {"message": "Valid token is missing"}, 401
        return f(*args, **kwargs)

    return decorator
