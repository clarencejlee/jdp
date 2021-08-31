from intuitlib.client import AuthClient
from quickbooks import QuickBooks
from quickbooks.objects.customer import Customer
from quickbooks.objects.invoice import Invoice
from quickbooks.objects.account import Account
from quickbooks.objects.purchase import Purchase
from quickbooks.objects.payment import Payment


class Object(object):
    pass


class QBWrapper():
    auth_client = None
    api_client = None

    def __init__(self, client_id, client_secret, environment, refresh_token, company_id):
        self.auth_client = AuthClient(
            client_id=client_id,
            client_secret=client_secret,
            environment=environment,
            redirect_uri='https://developer.intuit.com/v2/OAuth2Playground/RedirectUrl'
        )

        self.api_client = QuickBooks(
            auth_client=self.auth_client,
            refresh_token=refresh_token,
            company_id=company_id
        )

    def get_data(self):
        customers = Customer.all(qb=self.api_client)
        customer_ref = customers[0].to_ref()

        invoices = Invoice.all(qb=self.api_client)

        invoice_ref = invoices[0].to_ref()

        payments = Payment.filter(
            CustomerRef=customer_ref.value, qb=self.api_client
        )

        acc = Account.get(1, qb=self.api_client)

        purchases = Purchase.all(qb=self.api_client)

        data = []

        for i in range(8):
            invoice = invoices[i]
            purchase = purchases[i]
            payments = Payment.filter(
                CustomerRef=invoice.CustomerRef.value, qb=self.api_client)
            payment = payments[0] if len(payments) > 0 else None

            profit_margin = ((payment.TotalAmt - purchase.TotalAmt) /
                             payment.TotalAmt) * 100 if payment else 0

            csv = Object()
            csv.project = invoice.Id
            csv.name = invoice.Line[0].SalesItemLineDetail.ItemRef.name
            csv.customer = invoice.CustomerRef.name
            csv.contract = invoice.TotalAmt
            csv.billed_to_date = payment.TotalAmt if payment else 0
            csv.left_to_bill = invoice.TotalAmt - \
                payment.TotalAmt if payment else invoice.TotalAmt
            payment.TotalAmt if payment else invoice.TotalAmt
            csv.actual_costs = purchase.TotalAmt
            csv.profit_margin = profit_margin
            csv.paid_to_date = payment.TotalAmt if payment else 0
            csv.balance_due = invoice.TotalAmt - \
                payment.TotalAmt if payment else invoice.Balance
            payment.TotalAmt if payment else invoice.Balance
            csv.past_due = invoice.TotalAmt - payment.TotalAmt if payment else invoice.Balance
            data.append(csv)

        return data
