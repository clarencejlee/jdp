import { gql } from "@apollo/client";

export const login = gql`
  mutation login($input: authenticateUserInput) {
    loginUser(input: $input) {
      token
      User {
        _id
        lastname
        email
        phonenumber
        othernames
      }
    }
  }
`;

export const signup = gql`
  mutation SignUp($input: createUserInput) {
    signUpUser(input: $input) {
      token
      User {
        email
        phonenumber
      }
    }
  }
`;

export const getCredentials = gql`
  query Credentials {
    getCredentials {
      _id
      other_details
      platform
      user_id
    }
  }
`;

export const oauthShop = gql`
  mutation requestOuth($input: ShopifyLoginInput!) {
    requestOauth(input: $input) {
      url
    }
  }
`;

export const removeCredentials = gql`
  mutation RemoveCredential($input: RemoveCredentialInput!) {
    removeCredential(input: $input)
  }
`;

export const getOrders = gql`
  query {
    getShopifyOrders {
      app_id
      id
      billing_address {
        address1
        city
        address2
        company
      }
      email
      financial_status
      customer {
        id
        email
      }
      total_price
      id
      number
      note
      discount_codes {
        code
        amount
        type
      }
      current_total_discounts
      order_number
      order_status_url
      browser_ip
      currency
      created_at
      line_items {
        price
        quantity
        title
        variant_title
        vendor
        taxable
        fulfillable_quantity
        fulfillment_status
        fulfillment_service
        price_set {
          shop_money {
            amount
          }
        }
      }
    }
  }
`;

export const getProducts = gql`
  query GetProducts {
    getShopifyProducts {
      id
      title
      body_html
      vendor
      product_type
      created_at
      handle
      updated_at
      published_at
      template_suffix
      published_scope
      tags
      variants {
        option1
        price
        sku
      }
      images
      image
    }
  }
`;
