const { gql } = require("apollo-server-express");

module.exports = gql`
  input ShopifyLoginInput {
    storeName: String
    password: String
  }

  type Platform {
    name: String
  }

  input PlatformInput {
    name: String!
    api_key: String!
    secret: String!
  }

  input EditPlatformInput {
    id: ID!
    input: PlatformInput
  }

  type Credential {
    _id: ID
    other_details: String
    platform: String
    user_id: ID
  }

  type OAUTHResult {
    url: String
  }

  input RemoveCredentialInput {
    _id: ID
  }

  extend type Mutation {
    requestOauth(input: ShopifyLoginInput!): OAUTHResult
    addPlatform(input: PlatformInput!): Platform
    editPlatform(input: EditPlatformInput): Platform
    removeCredential(input: RemoveCredentialInput!): Boolean
  }

  extend type Query {
    getCredentials: [Credential]
    getPlatforms: [Platform]
  }
`;
