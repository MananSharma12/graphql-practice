const { gql } = require('graphql-tag');

export const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    username: String!
    email: String!
  }
  
  type Todo {
    id: ID!
    title: String!
    completed: Boolean
    user: User
  }
  
  type Query {
    getTodos: [Todo]
    getAllUsers: [User]
    getUser(id: ID!): User
  }
`;
