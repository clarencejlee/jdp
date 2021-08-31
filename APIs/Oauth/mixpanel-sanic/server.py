from sanic import Sanic
from sanic.response import text
import requests

app = Sanic("mixpanel")

@app.get("/funnels")
async def get_funnels(request):

    username = 'username-here'
    secret = 'secret-here'

    querystring = {"project_id": "project-id-here"}

    response = requests.get(
      'https://mixpanel.com/api/2.0/funnels/list',
      params=querystring,
      auth=(username, secret),
    )
    return text(response.text)
