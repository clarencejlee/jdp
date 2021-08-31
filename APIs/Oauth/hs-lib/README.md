### A python package that wraps around the hubspot api

#### installation

`clone this repo`

In your project:
`pip install /path/to/wheel.whl # is in the package dist folder`

#### Usage

    from hs.core import HSClient

    client =  HSClient(
        'your_api_key',
        500 # max results to get from the api
        5 # limit of the data you want to get
    )

    client.get_deals() # Get all the deals from your Hubspot dashboard
    client.get_contracts() # Get all your contracts
