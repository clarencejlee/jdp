//Project Initialisation

const express = require("express");
const { buildSchema } = require("graphql");
const morgan = require("morgan");
const cors = require("cors");
const { connectToDb } = require("./database");
const { GraphqlServer } = require("./GraphqlServer");
const route = require("./rest/routes");

var schema = buildSchema(`
  type Query {
    hello: String
  }
`);

const app = express();

app.use(cors());
app.use(morgan("combined"));
app.use(express.json());
app.use(route);

const graphqlServer = GraphqlServer();
graphqlServer.applyMiddleware({ app, path: "/graphql" });

app.listen(process.env.PORT || 8080, async () => {
  console.log("Server started on port 8080");
  await connectToDb();
}); //Set Port for server;
