const {
  fetchShopifyProducts,
  fetchOneOrder,
} = require("../../controllers/Orders");
const { Authenticate } = require("../../middleware/authenticate");

module.exports = {
  Mutation: {},
  Query: {
    getShopifyOrder: Authenticate(async (_, args, { user, token }) => {
      function getOrder() {
        return new Promise((resolve, reject) => {
          try {
            fetchOneOrder({ input: args.input, user }, ({ order }, err) => {
              if (err) {
                return reject(err);
              } else {
                // console.log(orders);
                return resolve(order);
              }
            });
          } catch (e) {
            // throw new e;
          }
        });
      }
      return await getOrder();
    }),
    getShopifyOrders: Authenticate(async (_, args, { user, token }) => {
      function getOrders() {
        return new Promise((resolve, reject) => {
          try {
            fetchShopifyProducts({ filter: args, user }, ({ orders }, err) => {
              if (err) {
                return reject(err);
              } else {
                // console.log(orders);
                return resolve(orders);
              }
            });
          } catch (e) {
            // throw new e;
          }
        });
      }
      return await getOrders();
    }),
  },
};
