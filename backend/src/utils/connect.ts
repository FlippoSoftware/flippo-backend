import { Surreal } from "surrealdb";
import config from "config";
import logger from "@utils/logger.ts";

const endpoint: string = config.get("surrealDB.endpoint");
const namespace: string = config.get("surrealDB.namespace");
const database: string = config.get("surrealDB.database");

const rootUsername: string = config.get("surrealDB.rootUsername");
const rootPassword: string = config.get("surrealDB.rootPassword");

let surreal: Surreal;

const initSurreal = async (): Promise<void> => {
  surreal = new Surreal();

  try {
    await surreal.connect(endpoint);
    await surreal.use({ namespace, database });
    await surreal.signin({
      username: rootUsername,
      password: rootPassword
    });
    logger.info("SurrealDB connected!");
  } catch (error: unknown) {
    logger.error("Error connecting to SurrealDB.");
  }
};

const getSurreal = (): Surreal => {
  if (!surreal) {
    initSurreal();
  }

  return surreal;
};

export { getSurreal, initSurreal };
