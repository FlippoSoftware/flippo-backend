import { Surreal } from "surrealdb";
import logger from "@utils/logger.ts";
import { ENV } from "@schemas/index.ts";

type TDbConfig = {
  database: string;
  endpoint: string;
  namespace: string;
  username: string;
  password: string;
};

const DEFAULT_CONFIG: TDbConfig = {
  database: ENV.SURREALDB_DB || "test",
  endpoint: ENV.SURREALDB_ENDPOINT || "http://127.0.0.1:8000/rpc",
  namespace: ENV.SURREALDB_NS || "test",
  username: ENV.SURREALDB_USER || "root",
  password: ENV.SURREALDB_PASS || "root"
};

let connectionPromise: Promise<Surreal> | null = null;

async function connectToDatabase(config: TDbConfig = DEFAULT_CONFIG): Promise<Surreal> {
  const db = new Surreal();

  try {
    await db.connect(config.endpoint);
    await db.use({ database: config.database, namespace: config.namespace });

    await db.signin({ password: config.password, username: config.username });

    logger.info("SurrealDB connected!");
    return db;
  } catch (error: any) {
    logger.error(`Error connecting to SurrealDB: ${error}`);

    await db.close();
    throw error;
  }
}

export async function getDb() {
  if (
    !connectionPromise ||
    !(await connectionPromise.then((db) => db.info()).then((info) => info?.id))
  ) {
    connectionPromise = connectToDatabase(DEFAULT_CONFIG);
  }

  return connectionPromise;
}
