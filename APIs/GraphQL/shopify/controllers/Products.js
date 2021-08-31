const { AuthenticationError } = require("apollo-server-errors");
const nShopify = require("shopify-node-api");
const Credentials = require("../models/Credentials");
const { shopify_api_key, shopify_secred } = require("./config");

async function fetchShopifyProducts(args, fn) {
  const { user } = args;

  const nCredential = await Credentials.findOne({ user_id: user._id }).lean();

  if (nCredential) {
    var shopify = new nShopify({
      shop: nCredential.other_details,
      shopify_api_key: shopify_api_key, // Your API key
      shopify_shared_secret: shopify_secred,
      // shopify_scope: "write_products,write_marketing_events,write_fulfillments,read_orders,write_reports,read_analytics,write_customers",
      access_token: nCredential.access_token,
    });

    shopify.get("/admin/products.json", {}, (err, data, d) => {
      fn(data, err);
    });
  } else {
    fn([], "Credentials not found, please login")
  }
}

// fetchShopifyProducts({});

module.exports = {
  fetchShopifyProducts,
};
