import { ENV } from '@shared/env';
import { Surreal } from 'surrealdb';

import { getDbTokenCookie, removeDbTokenCookie } from './utils/cookie.utils';

type TDbConfig = {
  database: string;
  endpoint: string;
  namespace: string;
};

const DEFAULT_CONFIG: TDbConfig = {
  database: ENV.SURREALDB_DB || 'test',
  endpoint: ENV.SURREALDB_ENDPOINT || 'http://127.0.0.1:8000/rpc',
  namespace: ENV.SURREALDB_NS || 'test'
};

let connectionPromise: null | Promise<Surreal> = null;

export async function connectToDatabase(config: TDbConfig = DEFAULT_CONFIG): Promise<Surreal> {
  const db = new Surreal();

  try {
    await db.connect(config.endpoint);
    await db.use({ database: config.database, namespace: config.namespace });

    const token = getDbTokenCookie();
    if (token) {
      try {
        await db.authenticate(token);
      } catch {
        removeDbTokenCookie();
      }
    }

    return db;
  } catch (err) {
    console.error('Failed to connect to SurrealDB:', err instanceof Error ? err.message : String(err));
    await db.close();
    throw err;
  }
}

export const getDb = async (config: TDbConfig = DEFAULT_CONFIG): Promise<Surreal> => {
  if (!connectionPromise) {
    connectionPromise = connectToDatabase(config);
  }

  return connectionPromise;
};
