from encoder import AlchemyEncoder
from models import Product
from sanic import Sanic
from sanic.response import json, text
import stripe

from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import sessionmaker
from sqlalchemy import select

from contextvars import ContextVar

from sanic_cors import CORS, cross_origin

import json as Json


stripe.api_key = '<insert key>'

app = Sanic("stripe_example")
CORS(app)

_base_model_session_ctx = ContextVar("session")

bind = create_async_engine("postgresql+asyncpg://postgres:postgres@localhost/stripedb", echo=True)


@app.middleware("request")
async def inject_session(request):
    request.ctx.session = sessionmaker(bind, AsyncSession, expire_on_commit=False)()
    request.ctx.session_ctx_token = _base_model_session_ctx.set(request.ctx.session)


@app.middleware("response")
async def close_session(request, response):
    if hasattr(request.ctx, "session_ctx_token"):
        _base_model_session_ctx.reset(request.ctx.session_ctx_token)
        await request.ctx.session.close()


@app.get('/products')
async def get_products(request):
    session = request.ctx.session

    async with session.begin():
        data = select(Product)
        result = await session.execute(data)

    rows = [dict(row) for row in result]
    res = Json.dumps(rows, cls=AlchemyEncoder)

    return json(Json.loads(res))


@app.post("/products/create")
async def create_product(request):
    session = request.ctx.session

    stripe_product = stripe.Product.create(name=request.json["name"])

    price_cents = request.json["price"]

    if request.json["type"] == "once":
          stripe_price = stripe.Price.create(
            unit_amount=price_cents,
            currency="usd",
            product=stripe_product.id,
        )
    elif request.json["type"] == "monthly":
          stripe_price = stripe.Price.create(
            unit_amount=price_cents,
            currency="usd",
            recurring={"interval": "month"},
            product=stripe_product.id
        )
    else:
        stripe_price = stripe.Price.create(
            unit_amount=price_cents,
            currency="usd",
            recurring={"interval": "year"},
            product=stripe_product.id
        )



    async with session.begin():
        product = Product(name=request.json["name"], client=request.json["client"], type=request.json["type"], price=request.json["price"], stripe_id=stripe_product.id)
        session.add(product)

    return json(product.to_dict())
