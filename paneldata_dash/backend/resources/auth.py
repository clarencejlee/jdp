import os
import json
import traceback
from urllib.parse import urlparse
from uuid import uuid4

from flask import (Flask, request, render_template, redirect, session,
                   make_response)

from flask_restful import Resource
from onelogin.saml2.auth import OneLogin_Saml2_Auth
#from app import app
from libs.auth_helper import prepare_flask_request, init_saml_auth
from models import UserModel

TYPE_VERIFICATION = "email"
LOGIN_NOT_FOUND = "Login not found."
INVALID_CREDENTIALS = "Email or password seems wrong..."
USER_LOGGED_OUT = "User <id={login_id}> successfully logged out."
PWD_CHANGED_SUCCESS=" Password has been changed successfully"
MAIL_CHANGED_SUCCESS = "Please verify your mailbox to verify your new mail"
FAILED_TO_CHANGE = "Attempt to change password has changed"
FAILED_TO_CHANGE_MAIL = "Attempt to change mail has failed"
EMAIL_CONSTANT = "urn:oid:1.3.6.1.4.1.5923.1.1.1.6"
# app.config['SAML_PATH'] = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'saml')


class Auth(Resource):
    @classmethod
    def get(cls):
        req = prepare_flask_request(request)
        auth = init_saml_auth(req)
        if 'sso' in request.args:
            # return redirect(auth.login())
            return {"message": auth.login()}, 200
            # If AuthNRequest ID need to be stored in order to later validate it, do instead
            # sso_built_url = auth.login()
            # request.session['AuthNRequestID'] = auth.get_last_request_id()
            # return redirect(sso_built_url)

    @classmethod
    def post(cls):
        req = prepare_flask_request(request)
        auth = init_saml_auth(req)
        if 'acs' in request.args:
            request_id = None
            auth.process_response(request_id=request_id)
            errors = auth.get_errors()
            authenticated = auth.is_authenticated()
            one_time_token = None
            if authenticated and len(errors) == 0:
                attributes = auth.get_attributes()
                user = UserModel.find_by_email(attributes.get(EMAIL_CONSTANT)[0])
                if not user:
                    user = UserModel(
                        auth.get_nameid(),
                        UserModel.generate_unusable_password(),
                        attributes.get(EMAIL_CONSTANT)[0]
                    )
                    user.one_time_token = uuid4().hex
                    user.save_to_db()
                else:
                    one_time_token = uuid4().hex
                    user.username = auth.get_nameid()
                    user.one_time_token = one_time_token
                    user.save_to_db()
                return redirect(os.environ.get("WEB_URL") + "/login?token=" + user.one_time_token, code=302)
        elif 'token' in request.args:
            # this will be temp token
            user = UserModel.find_by_token(request.args['token'])
            if user:
                user.one_time_token = None
                user.save_to_db()
                return {"access_token": user.username}, 200

            return {"message": "Invalid token"}, 401
