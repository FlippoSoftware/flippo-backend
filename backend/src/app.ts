import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import userAgent from "express-useragent";
import { getDb } from "@utils/connect.ts";
import logger from "@utils/logger.ts";
import { ENV } from "@schemas/index.ts";

import routes from "./router.ts";

const app = express();
const port = ENV.API_PORT;

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: ENV.APP_BASE_URL,
    credentials: true,
    optionsSuccessStatus: 200
  })
);
app.use(userAgent.express());

const start = () => {
  try {
    app.listen(port, async () => {
      logger.info(`Server started at http://localhost:${port}`);
      routes(app);

      let db = await getDb();

      if (!db.connection) {
        setTimeout(async function tick() {
          db = await getDb();
          if (!db.connection) setTimeout(tick, 30000);
        }, 30000);
      }
    });
  } catch (error: any) {
    logger.error("An error occurred while starting the server:", error);
  }
};

start();
