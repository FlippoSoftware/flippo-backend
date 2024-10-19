import { Surreal } from "surrealdb";
import logger from "@utils/logger.ts";
import { ENV } from "@schemas/index.ts";

const endpoint = ENV.SURREALDB_ENDPOINT;
const namespace = ENV.SURREALDB_NS;
const database = ENV.SURREALDB_DB;

const rootUsername = ENV.SURREALDB_USER;
const rootPassword = ENV.SURREALDB_PASS;

let surreal: Surreal;

const connectSurrealDB = async (): Promise<void> => {
  try {
    surreal = new Surreal();

    await surreal.connect(endpoint);
    await surreal.use({ namespace, database });
    await surreal.signin({
      username: rootUsername,
      password: rootPassword
    });
    logger.info("SurrealDB connected!");
  } catch (error: any) {
    logger.error(`Error connecting to SurrealDB: ${error}`);
  }
};

const getSurreal = (): Surreal => {
  if (!surreal.connection) {
    connectSurrealDB();
  }

  return surreal;
};

export { getSurreal, connectSurrealDB };
