from sanic import Sanic
from sanic.response import text, json
import json as Json

from intuitlib.client import AuthClient
from quickbooks import QuickBooks
from quickbooks.objects.customer import Customer
from quickbooks.objects.invoice import Invoice
from quickbooks.objects.account import Account
from quickbooks.objects.purchase import Purchase
from quickbooks.objects.payment import Payment

from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import sessionmaker
from sqlalchemy import select

from contextvars import ContextVar
from models import QBExport
from encoder import AlchemyEncoder

from sanic_cors import CORS, cross_origin

app = Sanic("qb_app")
CORS(app)

_base_model_session_ctx = ContextVar("session")

bind = create_async_engine("postgresql+asyncpg://postgres:postgres@localhost/qbexample", echo=True)

qb_auth_client = AuthClient(
    client_id='<client ID>',
    client_secret='<client secret>',
    environment='sandbox',
    redirect_uri='https://developer.intuit.com/v2/OAuth2Playground/RedirectUrl'
)


client = QuickBooks(
    auth_client=qb_auth_client,
    refresh_token='<refresh token>',
    company_id='<company id>'
)

app.ctx.qb_client = client

class Object(object):
    pass


@app.middleware("request")
async def inject_session(request):
    request.ctx.session = sessionmaker(bind, AsyncSession, expire_on_commit=False)()
    request.ctx.session_ctx_token = _base_model_session_ctx.set(request.ctx.session)


@app.middleware("response")
async def close_session(request, response):
    if hasattr(request.ctx, "session_ctx_token"):
        _base_model_session_ctx.reset(request.ctx.session_ctx_token)
        await request.ctx.session.close()


@app.get("/")
async def hello_world(request):
    test = Sanic.get_app()
    customers = Customer.all(qb=test.ctx.qb_client)
    # print(customers[0])
    customer_ref = customers[0].to_ref()

    session = request.ctx.session

    # invoices = Invoice.filter(CustomerRef=customer_ref.value, qb=test.ctx.qb_client)
    invoices = Invoice.all(qb=test.ctx.qb_client)
    # print(invoices[0].to_json())

    invoice_ref = invoices[0].to_ref()

    payments = Payment.filter(CustomerRef=customer_ref.value, qb=test.ctx.qb_client)
    # print(payments[0].to_json())

    acc = Account.get(1, qb=test.ctx.qb_client)

    purchases = Purchase.all(qb=test.ctx.qb_client)

    data = []

    for i in range(8):
        invoice = invoices[i]
        purchase = purchases[i]
        payments = Payment.filter(CustomerRef=invoice.CustomerRef.value, qb=test.ctx.qb_client)
        payment = payments[0] if len(payments) > 0 else None

        profit_margin = ((payment.TotalAmt - purchase.TotalAmt) / payment.TotalAmt) * 100 if payment else 0

        csv = Object()
        csv.project = invoice.Id
        csv.name = invoice.Line[0].SalesItemLineDetail.ItemRef.name
        csv.customer = invoice.CustomerRef.name
        csv.contract = invoice.TotalAmt
        csv.billed_to_date = payment.TotalAmt if payment else 0
        # monthly billed
        csv.left_to_bill = invoice.TotalAmt - payment.TotalAmt if payment else invoice.TotalAmt # This should be Contract ammount - billed_to_date
        csv.actual_costs = purchase.TotalAmt
        csv.profit_margin = profit_margin
        csv.paid_to_date = payment.TotalAmt if payment else 0
        csv.balance_due = invoice.TotalAmt - payment.TotalAmt if payment else invoice.Balance
        csv.past_due = invoice.TotalAmt - payment.TotalAmt if payment else invoice.Balance
        data.append(csv)

    for obj in data:
        print(Json.dumps(obj.__dict__))
        print("\n")

    async with session.begin():
        qbexports = []
        for obj in data:
            test = QBExport(project_id=int(obj.project), name=obj.name, client=obj.customer, contract=obj.contract, billed_to_date=obj.billed_to_date, left_to_bill=obj.left_to_bill, actual_costs=obj.actual_costs, profit_margins=obj.profit_margin, paid_to_date=obj.paid_to_date, balance_due=obj.balance_due, past_due=obj.past_due)
            session.add(test)


    return text("Quickbooks data imported!")


@app.get("/qbdata")
async def get_quickbooks_data(request):
    app_context = Sanic.get_app()
    session = request.ctx.session

    async with session.begin():
        data = select(QBExport)
        result = await session.execute(data)

    test = [dict(row) for row in result]
    res = Json.dumps(test, cls=AlchemyEncoder)

    return json({"result": Json.loads(res)})
