const { ApolloServer, gql } = require("apollo-server-express");
const { typeDefs, resolvers } = require("./domains");
const { decipherToken } = require("./helpers");


// const { decipherToken } = require("./helpers");



const rootTypeDef = gql`
  type Query {
    root: String
  }
  type Mutation {
    root: String
  }
`;

// Configuring graphQL server
exports.GraphqlServer = () => {

  return new ApolloServer({
    typeDefs: [rootTypeDef, ...typeDefs],
    // ...graphqlInterface.typeDefs
    resolvers: [resolvers],
    introspection: true,
    playground: true,
    tracing: true,
    context: async ({ req }) => {
      try {
        const token = req.headers.authorization || "";
        const user =  decipherToken(token);
        return { user, token };
      } catch (e) {
        throw e;
      }
    },
  });
};
