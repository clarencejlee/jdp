const Credentials = require("../models/Credentials");
const { shopify_api_key, shopify_secred } = require("./config");

const nShopify = require("shopify-node-api");


async function fetchMarketingData(args, fn) {
  const { user } = args;

  const nCredential = await Credentials.findOne({ user_id: user._id }).lean();

  if (nCredential) {
    var shopify = new nShopify({
      shop: nCredential.other_details,
      shopify_api_key: shopify_api_key, // Your API key
      shopify_shared_secret: shopify_secred,
    //   shopify_scope: "read_marketing_events",
      access_token: nCredential.access_token,
    });

    shopify.get("/admin/marketing_events.json", {}, (err, data, d) => {
      fn(data, err);
    });
  } else {
    fn([], "Credentials not found, please login");
  }
};

module.exports ={fetchMarketingData}
