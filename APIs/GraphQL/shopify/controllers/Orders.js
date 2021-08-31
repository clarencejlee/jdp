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
      access_token: "[access token]",
    });

    shopify.get("/admin/orders.json", {}, (err, data, d) => {
      fn(data, err);
    });
  } else {
    fn([], "Credentials not found, please login");
  }
}

async function fetchOneOrder(args, fn){
  const { user,input } = args;

  const nCredential = await Credentials.findOne({ user_id: user._id }).lean();

  if (nCredential) {
    var shopify = new nShopify({
      shop: nCredential.other_details,
      shopify_api_key: shopify_api_key, // Your API key
      shopify_shared_secret: shopify_secred,
      // shopify_scope: "write_products,write_marketing_events,write_fulfillments,read_orders,write_reports,read_analytics,write_customers",
      access_token: "[insert token]",
    });

    shopify.get(`/admin/orders/${input.order_id}`, {}, (err, data, d) => {
      fn(data, err);
    });
  } else {
    fn([], "Credentials not found, please login");
  }
}

module.exports = {
  fetchShopifyProducts,
  fetchOneOrder
};
