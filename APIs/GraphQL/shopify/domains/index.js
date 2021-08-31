const users = require("./users");
const oauth = require('./oauth');
const proudcts = require("./products");
const orders = require("./orders")

exports.resolvers = {
  Mutation: { ...users.resolvers.Mutation, ...oauth.resolvers.Mutation, ...proudcts.resolvers.Mutation, ...orders.resolvers.Mutation  },
  Query: { ...users.resolvers.Query,...oauth.resolvers.Query, ...proudcts.resolvers.Query, ...orders.resolvers.Query },
};

exports.typeDefs = [users.typeDefs, oauth.typeDefs, proudcts.typeDefs, orders.typeDefs];
