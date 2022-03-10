import { ApolloServer } from "apollo-server-express";
import * as dotenv from "dotenv";
import resolvers from "./data/resolvers";
import typeDefs from "./data/schema";

// load environment variables
dotenv.config();

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req, res, connection }: any) => {
    let user = req && req.user ? req.user : null;
    if (!req) {
      if (connection && connection.context && connection.context.user) {
        user = connection.context.user;
      }

      return {
        user,
      };
    }

    const requestInfo = {
      secure: req.secure,
      cookies: req.cookies,
    };

    return {
      user,
      res,
      requestInfo,
    };
  },
});

export default apolloServer;
