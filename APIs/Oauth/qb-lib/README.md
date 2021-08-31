### A python package that wraps around the quickbooks api

#### installation

`clone this repo`

In your project:
`pip install /path/to/wheel.whl # is in the package dist folder`

#### Usage

    from qb.core import QBWrapper

    client =  QBWrapper(
        'client_id',
        'client_secret',
        'sandbox', # environment
        'refresh_token',
        'company_id',
    )

    client.get_data()


Way to print it:

    import json

    # Return 
    data = client.get_data()

    print(json.dumps(data))
    
    # Or from an endpoint
    return json.dumps(data)

Easy way to print this front a react component:

    import JsonTable from "ts-react-json-table";  // needs to install ts-react-json-table
    
    const [data, setData] = useState();
    
    const fetchData = () => {
        fetch("[INSERT ENPOINT that returns the json.dumps]")
          .then((res) => res.json())
          .then((endpointdata) => {
            // Use data here
            setData(endpointdata);
          });
    };


In the actual react endpoint:

<JsonTable rows={data} />
