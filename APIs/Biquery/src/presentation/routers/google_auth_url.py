from sanic.response import json, redirect

def route(oauth_builder, auth_url=""):
    async def handler(request):
        oauth_client = oauth_builder.build()
        
        authorization_url, state = oauth_client.authorization_url(
            auth_url,
            access_type="offline", 
            prompt="select_account"
        )

        request.ctx.session["oauth_state"] = state

        return redirect(authorization_url)

    return handler
