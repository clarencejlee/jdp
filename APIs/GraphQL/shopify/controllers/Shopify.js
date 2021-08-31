const nShopify = require("shopify-node-api");
const { shopify_api_key, shopify_secred } = require("./config");

async function shopAuthenticate(args) {
  var myShopify = nShopify({
    shop: args.storeName, // MYSHOP.myshopify.com
    shopify_api_key: shopify_api_key, // Your API key
    shopify_shared_secret: shopify_secred, // Your Shared Secret
    shopify_scope:
      "write_products,write_marketing_events,write_fulfillments,read_orders,write_reports,read_analytics,write_customers",
    redirect_uri: "http://localhost:8080/api/redirect",
    nonce: "", // you must provide a randomly selected value unique for each authorization request
  });
  return { url: myShopify.buildAuthURL() };
}

function requestPermanentToken(query, fn) {
  var myShopify = nShopify({
    shop: query.shop, // MYSHOP.myshopify.com
    shopify_api_key: shopify_api_key, // Your API key
    shopify_shared_secret: shopify_secred, // Your Shared Secret
    // shopify_scope: "write_products,write_marketing_events,write_fulfillments,read_orders,write_reports,read_analytics,write_customers",
    redirect_uri: "http://localhost:8080/api/redirect",
    nonce: "", // you must provide a randomly selected value unique for each authorization request
  });

  myShopify.exchange_temporary_token(query, function (err, data) {
    fn(err, data);
  });
}

module.exports = {
  shopAuthenticate,
  requestPermanentToken,
};
