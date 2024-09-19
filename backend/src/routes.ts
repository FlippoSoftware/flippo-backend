import logger from "@utils/logger.ts";
import { Express } from "express";

function routes(app: Express) {
  app.get("/api", () => logger.info("GET resolved!"));
}

export default routes;
