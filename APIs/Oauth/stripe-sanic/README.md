### Requirements

Before running the app make sure you have postgres installed and running on your system.

You can modify the connection string in `server.py` or just use the defaults which is `stripedb` for the database, username and password is `postgres` and finally you would need a `product` table in the db containing:

```
    id serial
    name text
    client text
    type text
    price int
    stripe_id text

```

The endpoint that creates products is `/products/create`. This creates a product on stripe with the name and also creates a stripe price with the price (in cents) and the type (recurring{monthly, yearly}, one time)

The request that you need to send to `/products/create`:

```json
{
  "client": "Abe",
  "name": "Service #2",
  "type": "once",
  "price": 1099 // Price is in cents. This is a must for stripe!
}
```

### Runing the app

create a virtual env: `python3 -m venv venv`
install all the dependencies: `pip install -r requirements.txt`
run the project with `sanic server.app`
