from functools import wraps
from sanic.response import redirect

class AuthDecorator:
    def __init__(self, oauth_client, token_url, time_handler, client_secret, cm) -> None:
        self.client = oauth_client
        self.url = token_url
        self.time_handler = time_handler
        self.client_secret = client_secret
        self.cm = cm

    def ensure_authenticated(self, f):
        # @wraps(f)
        async def wrapper(request, *args, **kwargs):
            if not self.cm.has_credentials(request):
                return redirect('/login') # Authorization required
            
            token = self.cm.get_credentials(request)

            if (self.__is_expired(token)):
                refreshed_token = await self.__refresh_token(token)
                self.cm.set_credentials(request, refreshed_token)

            return f(request, *args, **kwargs)

        return wrapper

    def __is_expired(self, token):
        expires_at = token.get('expires_at')

        return self.time_handler.time() > expires_at

    async def __refresh_token(self, token):
        client = self.client.with_token(token).build()
        extra = {
            'client_id': client.client_id,
            'client_secret': self.client_secret,
        }
            
        refreshed_token = await client.refresh_token(self.url, **extra)

        return refreshed_token

def ensure_authenticated(function):
    def wrapper(request, *args, **kwargs):
        if "credentials" in request.ctx.session:
            return function(request, *args, **kwargs)

        return redirect('/login') # Authorization required

    return wrapper