const { gql } = require('graphql-tag');

const typeDefs = gql`
  type Account {
    id: ID!
    username: String!
    email: String!
  }

  type CreateAccountResponse {
    success: Boolean!
    message: String!
    account: Account
  }

  type DeleteAccountResponse {
    success: Boolean!
    message: String!
    account: Account
  }

  type UpdateAccountResponse {
    success: Boolean!
    message: String!
    account: Account
  }

  type Query {
    accounts: [Account]
    account(id: ID!): Account
  }

  input CreateAccountInput {
    username: String!
    email: String!
    password: String!
  }

  input UpdateAccountInput {
    id: ID!
    username: String
    email: String
    password: String
  }

  type Mutation {
    createAccount(input: CreateAccountInput!): CreateAccountResponse
    deleteAccount(id: ID!): DeleteAccountResponse!
    updateAccount(input: UpdateAccountInput!): UpdateAccountResponse

  }

  
`;

module.exports = { typeDefs };
