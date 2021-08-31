### Usage

In server.py modify the username and secret variables to your own. You can get them by creating a service account in your project settings on Mixpanel.
Additionally, you need to copy your 'project id' from the Mixpanel settings and paste that in the querysting inside server.py

Create a new virtual env
    `python3 -m venv venv`
Install the requirements
    `pip install -r requrements.txt`
Run the server
    `sanic server.app`

The endnpoint that lists all your funnels is http://localhost:8000/funnels
