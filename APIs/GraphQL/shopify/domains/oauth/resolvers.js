const {
  addPlatform,
  getAllPlatforms,
  addCredential,

  getUserCredentails,
  removeCredential,
} = require("../../controllers/Oauth");
const { shopAuthenticate } = require("../../controllers/Shopify");
const { Authenticate } = require("../../middleware/authenticate");
const cache = require("memory-cache");

module.exports = {
  Mutation: {
    requestOauth: Authenticate(async (_, args, { user, token }) => {
      cache.put(
        args.input.storeName.includes("myshopify.com")
          ? args.input.storeName
          : args.input.storeName + ".myshopify.com",
        JSON.stringify(user)
      );

      return await shopAuthenticate(args.input);
    }),

    addPlatform: async (_, args) => {
      return await addPlatform(args);
    },

    removeCredential: async (_, args) => {
      return await removeCredential(args);
    },
  },
  Query: {
    getPlatforms: async (_, args) => {
      return await getAllPlatforms();
    },
    getCredentials: Authenticate(async (_, args, { user }) => {
      return await getUserCredentails(user._id);
    }),
  },
};
