const express = require('express');
const cors = require('cors');
const { ApolloServer } = require('@apollo/server')
const { expressMiddleware } = require('@as-integrations/express5');
const axios = require("axios");

async function startServer() {
  const app = express();
  const server = new ApolloServer({
    typeDefs: `
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
  `,
    resolvers: {
      Todo: {
        user: async (todo) => (await axios.get(`http://jsonplaceholder.typicode.com/users/${todo.userId}`)).data
      },
      Query: {
        getTodos: async () => (await axios.get("http://jsonplaceholder.typicode.com/todos")).data,
        getAllUsers: async () => (await axios.get("http://jsonplaceholder.typicode.com/users")).data,
        getUser: async (_, {id}) => (await axios.get(`http://jsonplaceholder.typicode.com/users/${id}`)).data,
      },
    }
  });

  await server.start();

  app.use("/graphql", cors(), express.json(), expressMiddleware(server));

  app.listen(3000, () => {
    console.log("Server is running on port 3000")
  });
}

startServer();
