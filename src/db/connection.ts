import * as dotenv from "dotenv";
import { graphql } from "graphql";
import { makeExecutableSchema } from "@graphql-tools/schema";

import resolvers from "../data/resolvers";
import typeDefs from "../data/schema";
import { getEnv } from "../data/utils";

import mongoose = require("mongoose");
dotenv.config();

const MONGO_URL = getEnv({ name: "MONGO_URL", defaultValue: "" });

export const connectionOptions = {
  useNewUrlParser: true,
};

mongoose.Promise = global.Promise;

mongoose.connection
  .on("connected", () => {
    console.log(`Connected to the database: ${MONGO_URL}`);
  })
  .on("disconnected", () => {
    console.log(`Disconnected from the database: ${MONGO_URL}`);
  })
  .on("error", (error) => {
    console.log(`Database connection error: ${MONGO_URL}`, error);
  });

export const connect = async (URL?: string, options?) => {
  return mongoose.connect(URL || MONGO_URL, {
    ...connectionOptions,
    ...options,
  });
};

export function disconnect() {
  return mongoose.connection.close();
}

/**
 * Health check status
 */
export const mongoStatus = () => {
  return new Promise((resolve, reject) => {
    mongoose.connection.db.admin().ping((err, result) => {
      if (err) {
        return reject(err);
      }

      return resolve(result);
    });
  });
};

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

export const graphqlRequest = async (
  source: string = "",
  name: string = "",
  // args?: any,
  context: any = {}
) => {
  const res = {
    cookie: () => {
      return "cookie";
    },
  };

  const finalContext: any = {};

  finalContext.requestInfo = { secure: false, cookies: [] };
  finalContext.dataSources = context.dataSources;
  finalContext.user = context.user;
  finalContext.res = context.res || res;
  finalContext.commonQuerySelector = {};
  finalContext.userBrandIdsSelector = {};
  finalContext.brandIdSelector = {};
  finalContext.docModifier = (doc: any) => doc;

  const rootValue = {};

  const response: any = await graphql({
    schema,
    source,
    rootValue,
    contextValue: finalContext,
    // args,
  });

  if (response.errors || !response.data) {
    throw response.errors;
  }

  return response.data[name];
};
