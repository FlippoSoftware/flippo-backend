import { Surreal } from "surrealdb";
import logger from "@utils/logger.ts";
import { SurrealDBEnv } from "@schemas/index.ts";

const endpoint = SurrealDBEnv.SURREALDB_ENDPOINT;
const namespace = SurrealDBEnv.SURREALDB_NS;
const database = SurrealDBEnv.SURREALDB_DB;

const rootUsername = SurrealDBEnv.SURREALDB_USER;
const rootPassword = SurrealDBEnv.SURREALDB_PASS;

let surreal: Surreal;

const connectSurrealDB = async (): Promise<void> => {
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
    logger.error(`Error connecting to SurrealDB: ${error}`);
  }
};

const getSurreal = (): Surreal => {
  if (!surreal) {
    connectSurrealDB();
  }

  return surreal;
};

export { getSurreal, connectSurrealDB };
