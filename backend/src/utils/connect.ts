import { Surreal } from "surrealdb";
import logger from "@utils/logger.ts";
import { ENV } from "@schemas/index.ts";

type TDbConfig = {
  database: string;
  endpoint: string;
  namespace: string;
};

type TCredentials = {
  username: string;
  password: string;
};

const DEFAULT_CONFIG: TDbConfig = {
  database: ENV.SURREALDB_DB || "test",
  endpoint: ENV.SURREALDB_ENDPOINT || "http://127.0.0.1:8000/rpc",
  namespace: ENV.SURREALDB_NS || "test"
};

const DEFAULT_CREDENTIALS: TCredentials = {
  username: ENV.SURREALDB_USER || "root",
  password: ENV.SURREALDB_PASS || "root"
};

let connectionPromise: Promise<Surreal> | null = null;

async function connectToDatabase(config: TDbConfig = DEFAULT_CONFIG): Promise<Surreal> {
  const db = new Surreal();

  try {
    await db.connect(config.endpoint);
    await db.use({ database: config.database, namespace: config.namespace });

    await signInToDatabase(db);

    await db.ready;

    logger.info("SurrealDB connected!");
    return db;
  } catch (error: any) {
    logger.error(`Error connecting to SurrealDB: ${error}`);

    await db.close();
    throw error;
  }
}

async function signInToDatabase(db: Surreal, credentials: TCredentials = DEFAULT_CREDENTIALS) {
  await db.signin({ password: credentials.password, username: credentials.username });
  await db.ready;
}

export async function getDb() {
  if (!connectionPromise) {
    connectionPromise = connectToDatabase(DEFAULT_CONFIG);
  }

  const db = await connectionPromise;
  const connection = await db.connection;
  if (!connection) {
    await signInToDatabase(db, DEFAULT_CREDENTIALS);
  }

  return connectionPromise;
}
