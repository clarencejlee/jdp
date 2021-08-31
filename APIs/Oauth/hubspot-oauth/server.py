from sanic import Sanic, response
from sanic.response import text
from requests_oauthlib import OAuth2Session
import json
from sanic_cors import CORS, cross_origin

app = Sanic("My Hello, world app")
CORS(app)

oauth_config = {
    'client_id': 'f1054638-5479-416e-8eca-2a1b8c69fa79',
    'client_secret': '3899a644-95ec-469f-acb4-558116b714d1',
    'scopes': ['contacts'],
    'auth_uri': 'https://app.hubspot.com/oauth/authorize',
    'token_uri': 'https://api.hubapi.com/oauth/v1/token'
}

@app.get("/")
async def hello_world(request):
    return text("Hello, world.")

@app.get("/oauth")
async def oauth(request):
    oauth = OAuth2Session(
        client_id='f1054638-5479-416e-8eca-2a1b8c69fa79',
        scope=['contacts'],
        redirect_uri='http://localhost:8000/callback'
    )

    auth_url, _ = oauth.authorization_url('https://app.hubspot.com/oauth/authorize')

    return response.redirect(auth_url)


@app.get("/callback")
async def callback(request):
    my_app = Sanic.get_app()
    request_uri = "{}{}?{}".format("http://localhost:8000", request.path, request.query_string)
    state_tok = request.args.get('state', None)
    auth_code = request.args.get('code', None)

    oauth = OAuth2Session(
        client_id='f1054638-5479-416e-8eca-2a1b8c69fa79',
        scope=['contacts'],
        redirect_uri='http://localhost:8000/callback'
    )

    try:
        token = oauth.fetch_token(
            'https://api.hubapi.com/oauth/v1/token',
            authorization_response=request_uri.replace('http', 'https'),
            include_client_id=True,
            client_secret='3899a644-95ec-469f-acb4-558116b714d1',
        )
        my_app.ctx.token = token
    except Exception as e:
        print(e)

    return response.redirect('http://localhost:3000')


def save_token(token):
    my_app = Sanic.get_app()
    my_app.ctx.token = token


@app.get("/hubdata")
async def hubdata(request):
    my_app = Sanic.get_app()
    oauth = OAuth2Session(
        oauth_config['client_id'],
        token=my_app.ctx.token,
        auto_refresh_url=oauth_config['token_uri'],
        auto_refresh_kwargs=oauth_config,
        token_updater=save_token
    )

    res = oauth.get(
        'https://api.hubapi.com/crm/v3/objects/deals',
        params={ 'count': 3, 'properties': ['vertical', 'amount', 'dealname', 'dealstge', 'closedate', 'pipeline'] } # Return only 1 result -- for demo purposes
    )

    data = json.dumps(res.json())

    return response.json(json.loads(data))
