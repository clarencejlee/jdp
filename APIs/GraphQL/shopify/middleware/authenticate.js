const { AuthenticationError } = require("apollo-server-express");

const Authenticate = (fn) => {
  return (_, args, context, info) => {
      
    if (context.user instanceof Error || !context.user) {
      return new AuthenticationError("Authentication Failed");
    }

    return fn(_, args, context, info);
  };
};

module.exports = {
  Authenticate,
};
