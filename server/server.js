// allows to use env variables
require("dotenv").config();
///built in nodejs  -  - using path when reaching out  line 20
const path = require("path");
///use apollo server
const { ApolloServer } = require("@apollo/server");
//middleware allows to assign json token and verify json token - who is logged in etc
const { authMiddleware } = require("./utils/auth");
///connects express with apollo
const { expressMiddleware } = require("@apollo/server/express4");
const { typeDefs, resolvers } = require("./schemas");
const cors = require("cors");

// connect to express, establish port
const express = require("express");
const app = express();
const PORT = process.env.PORT || 5001;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../client/build")));
  
  };

// connecting to database mongoose
const db = require("./config/connection");

/// connects to seeders, typeDefs and resolvers
require ("./seeders");
const {typeDefs, resolvers} = require("./schemas");




const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [
        {
          // hooks into Apollo lifecycle for request and contextValues
          async requestDidStart(context) {
            // goes to authMiddleware
            authMiddleware(context);
          },
        },
      ],
    
  });

///starts server and grapql
const startServer = async () => {
    await server.start();
    // use express app as middleware for apollo server
    server.applyMiddleware({app})
    app.use("/graphql", cors(), expressMiddleware(server));
  
    db.once("open", () => {
      app.listen(PORT, () => {
        console.log(`API server running on http://localhost:${PORT}`);
        console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
      });
    });
  };
  
  startServer();

