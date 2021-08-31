from async_oauthlib.oauth2_session import OAuth2Session

from sanic.response import json, redirect

def route(oauth_builder, credential_manager, token_url="", client_secret=""):
    async def handler(request):
        if ("oauth_state" not in request.ctx.session):
            # Replace redirect to error page
            return redirect('/login')

        try:
            oauth_client = oauth_builder \
            .with_state(request.ctx.session["oauth_state"]) \
            .build()

            token = await oauth_client.fetch_token(
                token_url,
                client_secret=client_secret,
                authorization_response=request.url
            )

            credential_manager.set_credentials(request, token)

            return redirect('/')
        except Exception:
            # Replace redirect to error page
            return redirect('/login')

    return handler
