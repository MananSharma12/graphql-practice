const express = require('express');
const cors = require('cors');
const { ApolloServer } = require('@apollo/server')
const { expressMiddleware } = require('@as-integrations/express5');
const { schema } = require('./graphql/schema');

async function startServer() {
  const app = express();
  const server = new ApolloServer({ schema });

  await server.start();

  app.use("/graphql", cors(), express.json(), expressMiddleware(server));

  app.listen(3000, () => {
    console.log("Server is running on port 3000")
  });
}

startServer();
