from hubspot import HubSpot
from sanic import Sanic
from sanic.response import json, text
import json as Json
from sanic_cors import CORS

app = Sanic("hs_new")
CORS(app)

api_client = HubSpot(api_key='344945d8-e6c9-4b67-a458-fa0637082a74')
app.ctx.client = api_client


@app.get('/deals')
async def get_deals(request):
    my_app = Sanic.get_app()
    deals = my_app.ctx.client.crm.deals.basic_api.get_page(limit=10, archived=False)

    print(deals._results)

    return json(Json.loads(Json.dumps(deals._results)))


@app.get('/contacts')
async def get_contacts(request):
    my_app = Sanic.get_app()
    all_contacts = my_app.ctx.client.crm.contacts.get_all()

    print(all_contacts)

    return json(Json.loads(Json.dumps(all_contacts)))
