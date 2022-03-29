import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import apolloServer from "./src/apolloClient";
import { getEnv } from "./src/data/utils";
import { createServer } from "http";
import { connect } from "./src/db/connection";
import cors from "cors";
import userMiddleware from "./src/userMiddleware";

// load environment variables
dotenv.config();

async function startServer() {
  const { JWT_TOKEN_SECRET } = process.env;

  if (!JWT_TOKEN_SECRET) {
    throw new Error("Please configure JWT_TOKEN_SECRET environment variable.");
  }

  const app = express();

  await apolloServer.start();

  app.use(cookieParser());
  app.use(userMiddleware);

  const corsOptions = {
    credentials: true,
  };

  app.use(cors(corsOptions));

  apolloServer.applyMiddleware({ app: app });

  // Error handling middleware
  app.use((error: any, _req: any, res: any, _next: any) => {
    console.error(error.stack);
    res.status(500).send(error.message);
  });

  // Wrap the Express server
  const httpServer = createServer(app);

  const PORT = getEnv({ name: "PORT" });

  httpServer.listen({ port: process.env.PORT || 4000 }, () => {
    connect();
    console.log(`
      🚀  Server is ready at ${PORT}
    `);
  });

  process.stdin.resume();
}
startServer();
