### Usage

Create an Amplitude.com account and create a company and a project. When you create a project, you will receive an api_key and a secret key. Paste those in the api_key and secret_key variables in server.py

Modify the querystring variable for the timerange you would like to export data for.

Create a new virtual env
    `python3 -m venv venv`
Install the requirements
    `pip install -r requrements.txt`
Run the server
    `sanic server.app`
