const { gql } = require("apollo-server-express");

module.exports = gql`
  

  type Variants {
    option1: String
    price: String
    sku: String
  }

  type Product {
    id: String
    title: String
    body_html: String
    vendor: String
    product_type: String
    created_at: String
    handle: String
    updated_at: String
    published_at: String
    template_suffix: String
    published_scope: String
    tags: String
    variants: [Variants]
    images: [String]
    image: String
  }

  type Marketing {
    remote_id: String
    paid: Boolean
    marketing_channel: String
    referring_domain: String
    budget: Int
  }

  input ProductsFilter {
    id: Int
    title: String
  }

  extend type Query {
    getShopifyProducts(filter: ProductsFilter): [Product]
    getMarketingEvents: [Marketing]
  }
`;
