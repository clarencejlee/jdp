const { gql } = require("apollo-server-express");

module.exports = gql`
  type BillingAddress {
    address1: String
    address2: String
    city: String
    company: String
    country: String
    first_name: String
    last_name: String
    phone: String
    province: String
    zip: String
    name: String
    province_code: String
    country_code: String
    latitude: String
    longitude: String
  }

  type Customer {
    id: String
    email: String
    accept_marketing: Boolean
    first_name: String
    last_name: String
    orders_count: String
    state: String
    total_spent: String
    last_order_id: String
    phone: String
    note: String
    verified_email: Boolean
    tax_exempt: Boolean
    currency: String
  }

  type DiscountApplications {
    type: String
    title: String
    description: String
    value: String
    value_type: String
    allocation_method: String
    target_selection: String
    target_type: String
  }

  enum DiscountCodeTypes {
    fixed_amount
    percentage
    shipping
  }

  type DiscountCodes {
    code: String
    amount: String
    type: DiscountCodeTypes
  }

  enum FinancialStatus {
    pending
    authorized
    partially_paid
    paid
    partially_refunded
    refunded
    voided
  }

  type LineItem {
    fulfillable_quantity: Int
    fulfillment_service: String
    fulfillment_status: String
    grams: Int
    id: String
    price: String
    product_id: String
    quantity: Int
    requires_shipping: Boolean
    sku: String
    title: String
    variant_id: String
    variant_title: String
    vendor: String
    gift_card: Boolean
    price_set: PriceSet
    properties: [Properties]
    taxable: Boolean
    tax_lines: [TaxLine]
    total_discount: String
    total_discount_set: PriceSet
    discount_allocations: [DiscountAllocation]
    origin_location: OriginLocation
  }

  type OriginLocation {
    id: String
    country_code: String
    province_code: String
    name: String
    address1: String
    city: String
    zip: String
  }

  type DiscountAllocation {
    amount: Int
    discount_application_index: Int
    amount_set: PriceSet
  }

  type TaxLine {
    title: String
    price: String
    price_set: PriceSet
    rate: Int
  }

  type PricesetContent {
    amount: String
    currency_code: String
  }
  type PriceSet {
    shop_money: PricesetContent
    presentment_money: PricesetContent
  }

  type Properties {
    name: String
    value: String
  }

  type Order {
    id: String
    app_id: String
    billing_address: BillingAddress
    browser_ip: String
    buyer_accepts_marketing: String
    cancel_reason: String
    cancelled_at: String
    cart_token: String
    checkout_token: String
    currency: String
    current_total_discounts: String
    customer: Customer
    customer_locale: String
    discount_applications: DiscountApplications
    discount_codes: DiscountCodes
    email: String
    note: String
    number: Int
    financial_status: FinancialStatus
    admin_graphql_api_id: String
    checkout_id: String
    confirmed: Boolean
    current_subtotal_price: String
    current_total_price: String
    current_total_tax: String
    created_at: String
    gateway: String
    line_items: [LineItem]
    order_number: Int
    payment_details: PaymentDetails
    phone: String
    presentment_currency: String
    processed_at: String
    referring_site: String
    test: Boolean
    total_price: String
    total_outstanding: String
    total_price_set: PriceSet
    total_shipping_price_set: PriceSet
    total_tax: String
    total_tax_set: PriceSet
    total_tip_received: String
    total_weight: Int
    updated_at: String
    user_id: String
    order_status_url: String
  }

  type PaymentDetails {
    avs_result_code: String
    credit_card_bin: String
    cvv_result_code: String
    credit_card_number: String
    credit_card_company: String
  }

  input GetOneOrderFilter {
    order_id: String
  }

  extend type Query {
    getShopifyOrders: [Order]
    getShopifyOrder(input: GetOneOrderFilter!): Order
  }
`;
