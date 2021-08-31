from sanic import Sanic
from sanic.response import json, text
import json as Json
from hs.core import HSClient
from sanic_cors import CORS, cross_origin

app = Sanic("hs_lib_example")
CORS(app)

client = HSClient(
        '[insert key]',
        500,
        5
        )

app.ctx.hs_client = client

@app.get('/')
async def return_data(request):
    my_app = Sanic.get_app()
    data = app.ctx.hs_client.get_deals()

    return json(Json.loads(Json.dumps(data)))
