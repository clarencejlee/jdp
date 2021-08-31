from sanic import Sanic
from sanic.response import json, text
from qb.core import QBWrapper
import simplejson as Json
from sanic_cors import CORS

app = Sanic("qb_lib_example")
CORS(app)

client = QBWrapper(
    'ABpnwGAiNlEX8hKDX6MXVpcDSt5Vb5X3OQPvLf39IY8Pyp3yAv',
    'ds7kFlbSH5EPLuOK1MdVfAfEFY89CmcOGaV1TfEP',
    'sandbox',
    'AB116310948189wnN93hQaeCCV2Q8m3GXuGovV6kGBZrditWj1',
    '4620816365168394210'
)

app.ctx.qb_client = client

@app.get('/')
async def return_data(request):
    my_app = Sanic.get_app()
    data = app.ctx.qb_client.get_data()
    dataList = []

    for obj in data:
        dataList.append(Json.loads(Json.dumps(obj.__dict__)))

    return json(Json.loads(Json.dumps(dataList)))
