const { gql } = require("apollo-server-express");

module.exports = gql`
  scalar Date

  input authenticateUserInput {
    email: String!
    password: String!
  }

  type User {
    _id: ID
    lastname: String
    othernames: String
    phonenumber: String
    email: String
  }

  input nEditUserInput {
    lastname: String
    othernames: String
    email: String
    phonenumber: String
  }

  input editUserInput {
    _id: ID!
    data: nEditUserInput
  }

  input createUserInput {
    lastname: String!
    othernames: String!
    email: String!
    phonenumber: String
    password: String!
}

  type UserAuth {
    token: String
    User: User
  }

  extend type Query {
    getUsers: [User]
  }

  extend type Mutation {
    loginUser(input: authenticateUserInput): UserAuth
    signUpUser(input: createUserInput): UserAuth
    editUser(input: editUserInput): User
  }
`;
