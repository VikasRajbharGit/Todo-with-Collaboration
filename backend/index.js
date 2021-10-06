const { ApolloServer } = require("apollo-server-express");
const { ApolloServerPluginDrainHttpServer } = require("apollo-server-core");
const express = require("express");
const http = require("http");
const { makeExecutableSchema } = require("@graphql-tools/schema");
const {
  ApolloServerPluginLandingPageGraphQLPlayground,
} = require("apollo-server-core");
const mongoose = require("mongoose");

const typeDefs = require("./graphql/typeDefs");
const resolvers = require("./graphql/resolvers");
const { MONGODB } = require("./config");

const PORT = process.env.PORT || 5000;
async function startApolloServer(typeDefs, resolvers) {
  const app = express();
  const httpServer = http.createServer(app);

  const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
  });

  await mongoose.connect(MONGODB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const server = new ApolloServer({
    schema,
    plugins: [
      {
        async serverWillStart() {
          return {
            // async drainServer() {
            //   subscriptionServer.close();
            // },
          };
        },
      },
      // ApolloServerPluginLandingPageGraphQLPlayground({
      //   // options
      // }),
      ApolloServerPluginDrainHttpServer({ httpServer }),
    ],
    context: ({ req }) => ({ req }),
  });

  await server.start();
  server.applyMiddleware({
    app,

    path: "/",
  });

  await new Promise((resolve) => httpServer.listen({ port: PORT }, resolve));
  console.log(
    `🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`
  );
}

startApolloServer(typeDefs, resolvers);
