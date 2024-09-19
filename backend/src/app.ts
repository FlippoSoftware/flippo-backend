import express, { Request, Response } from "express";
import config from "config";
import { initSurreal } from "@utils/connect.ts";
import logger from "@utils/logger.ts";
import routes from "./routes.ts";

const app = express();
const port = config.get<number>("server.port");

app.get("/", (req: Request, res: Response) => {
  res.json({ greeting: "Hello world!" });
});

app.listen(port, async () => {
  logger.info(`Server started at http://localhost:${port}`);

  await initSurreal();

  routes(app);
});
