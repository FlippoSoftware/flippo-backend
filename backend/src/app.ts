import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import userAgent from "express-useragent";

import { connectSurrealDB } from "@utils/connect.ts";
import logger from "@utils/logger.ts";
import routes from "./router.ts";
import { ServerEnv } from "@schemas/env/server.env.ts";
import errorMiddleware from "@middleware/error.middleware.ts";

const app = express();
const port = ServerEnv.SERVER_PORT;

app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(userAgent.express());
app.use(errorMiddleware);

const start = () => {
  try {
    app.listen(port, async () => {
      logger.info(`Server started at http://localhost:${port}`);

      await connectSurrealDB();

      routes(app);
    });
  } catch (error: unknown) {
    logger.error("An error occurred while starting the server:", error);
  }
};

start();
