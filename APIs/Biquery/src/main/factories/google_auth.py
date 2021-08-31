# from requests_oauthlib import OAuth2Session
from async_oauthlib.oauth2_session import OAuth2Session

from main.config.env import read_env

__base_scope_uri = "https://www.googleapis.com/auth/"

def with_google_auth(scopes=[]):
    env_vars = read_env()

    formatted_scopes = list(
        map(lambda x: x.replace("*/", __base_scope_uri), scopes)
    )

    return OAuth2Session(
        env_vars["GOOGLE_CLIENT_ID"],
        scope=formatted_scopes,
        redirect_uri=f'{env_vars["BASE_URL"]}/{env_vars["GOOGLE_AUTH_REDIRECT"]}',
        auto_refresh_url= f'{env_vars["BASE_URL"]}/{env_vars["GOOGLE_TOKEN_URL"]}'
    )


class GoogleAuthBuilder():
    __base_scope_uri = "https://www.googleapis.com/auth/"

    def __init__(self):
        self.clear()
    
    def clear(self):
        self.scope = []
        self.state = ""
        self.token = None

    def with_scope(self, scope):
        self.scope = list(
            map(lambda x: x.replace("*/", GoogleAuthBuilder.__base_scope_uri), scope)
        )
        return self
    
    def with_state(self, state):
        self.state = state
        return self

    def with_token(self, token):
        self.token = token
        return self

    def build(self):
        env_vars = read_env()
        
        return OAuth2Session(
            env_vars["GOOGLE_CLIENT_ID"],
            scope=self.scope,
            state=self.state,
            token=self.token,
            redirect_uri=f'{env_vars["BASE_URL"]}/{env_vars["GOOGLE_AUTH_REDIRECT"]}',
            # auto_refresh_url= f'{env_vars["BASE_URL"]}/{env_vars["GOOGLE_TOKEN_URL"]}'
        )
