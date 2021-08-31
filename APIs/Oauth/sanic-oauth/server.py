from sanic import Sanic, response
from sanic.response import text
from intuitlib.client import AuthClient
from intuitlib.enums import Scopes
from qb.core import QBWrapper
import json
from sanic_cors import CORS, cross_origin

app = Sanic("oauth")
CORS(app)

auth_client = AuthClient(
    client_id='<Insert key>',
    client_secret='<insert key>',
    environment='sandbox',
    redirect_uri='http://localhost:8000/callback'
)

scopes = [
        Scopes.ACCOUNTING,
]

auth_url = auth_client.get_authorization_url(scopes)

@app.get("/")
async def hello_world(request):
    return text("Hello, world.")

@app.get("/oauth")
async def oauth(request):
    return response.redirect(auth_url)


@app.get("/callback")
async def callback(request):
    state_tok = request.args.get('state', None)
    error = request.args.get('error', None)
    auth_code = request.args.get('code', None)
    realm_id = request.args.get('realmId', None)

    access_token = ''
    refresh_token = ''
    id_token = ''

    my_app = Sanic.get_app()


    print("ALJOOOOOO")
    print(auth_code)

    try:
        auth_client.get_bearer_token(auth_code, realm_id=realm_id)
        access_token = auth_client.access_token
        refresh_token = auth_client.refresh_token
        id_token = auth_client.id_token

        my_app.ctx.access_token = access_token
        my_app.ctx.refresh_token = refresh_token
        my_app.ctx.id_token = id_token
        my_app.ctx.company_id = realm_id
    except Exception as e:
        print(e)

    return response.redirect("http://localhost:3000")


@app.get("/qbdata")
async def qbdata(request):
    my_app = Sanic.get_app()
    client = QBWrapper(
        'ABpnwGAiNlEX8hKDX6MXVpcDSt5Vb5X3OQPvLf39IY8Pyp3yAv',
        'ds7kFlbSH5EPLuOK1MdVfAfEFY89CmcOGaV1TfEP',
        'sandbox',
        my_app.ctx.refresh_token,
        my_app.ctx.company_id,
        my_app.ctx.access_token
            )

    data = client.get_data()
    dataList = []

    for obj in data:
        dataList.append(json.loads(json.dumps(obj.__dict__)))

    return response.json(json.loads(json.dumps(dataList)))
