const { gql } = require('graphql-tag');

const typeDefs = gql`
  type Comment {
    id: ID!
    accountId: ID!
    content: String!
    createdAt: String!
  }

  type CreateCommentResponse {
    success: Boolean!
    message: String!
    comment: Comment
  }

  type DeleteCommentResponse {
    success: Boolean!
    message: String!
    comment: Comment
  }

  type UpdateCommentResponse {
    success: Boolean!
    message: String!
    comment: Comment
  }

  type Query {
    comments(accountId: ID): [Comment!]!
    comment(id: ID!): Comment
  }

  input CreateCommentInput {
    accountId: ID!
    content: String!
  }

  input UpdateCommentInput {
    id: ID!
    content: String
  }

  type Mutation {
    createComment(input: CreateCommentInput!): CreateCommentResponse!
    deleteComment(id: ID!): DeleteCommentResponse!
    updateComment(input: UpdateCommentInput!): UpdateCommentResponse!
  }
`;

module.exports =  typeDefs ;
