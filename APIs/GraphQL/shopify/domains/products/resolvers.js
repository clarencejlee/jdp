const { fetchMarketingData } = require("../../controllers/Marketing");
const { fetchShopifyProducts } = require("../../controllers/Products");
const { Authenticate } = require("../../middleware/authenticate");

module.exports = {
  Mutation: {},
  Query: {
    getShopifyProducts: Authenticate(async (_, args, { user }) => {
      function getProductsAsync() {
        return new Promise((resolve, reject) => {
          try {
            fetchShopifyProducts(
              { filter: args, user },
              ({ products }, err) => {
                if (err) {
                  return reject(err);
                } else {
                  return resolve(products);
                }
              }
            );
          } catch (e) {
            // throw new e;
          }
        });
      }
      return await getProductsAsync();
    }),
    getMarketingEvents: Authenticate(async (_, args, { user }) => {
      // console.log("hi")
      function getMarketingData() {
        return new Promise((resolve, reject) => {
          try {
            fetchMarketingData({ filter: args, user }, (data, err) => {
              // console.log(data);
              if (err) {
                return reject(err);
              } else {
                return resolve(data.marketing_events);
              }
            });
          } catch (e) {
            // throw new e;
          }
        });
      }
      return await getMarketingData();
    }),
  },
};
