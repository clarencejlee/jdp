from sanic import Sanic
from sanic.response import text
import requests

app = Sanic("amplitude")

@app.get("/exports")
async def export_data(request):
    api_key = 'api-key-here'
    secret_key = 'secret-key-here'

    querystring = {
            "start": "20150201T5",
            "end": "20150203T20"
    }

    response = requests.get(
        'https://amplitude.com/api/2/export',
        params=querystring,
        auth=(api_key, secret_key)
    )

    return text(response.text)
