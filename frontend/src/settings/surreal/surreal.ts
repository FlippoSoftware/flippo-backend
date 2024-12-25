import { ENV } from '@shared/env';
import { createEffect, createEvent, createStore, sample } from 'effector';
import { Surreal } from 'surrealdb';

import { getDbTokenCookie, removeDbTokenCookie } from './utils/cookie.utils';
import { SurrealError } from './utils/surreal.error';

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

export const $db = createStore<null | Surreal>(null);
export const $dbConfig = createStore<TDbConfig>(DEFAULT_CONFIG);

export const initDb = createEvent();

const dbConnectFx = createEffect<TDbConfig, Surreal>(async (config) => {
  const db = new Surreal();

  await db.connect(config.endpoint);
  await db.use({ database: config.database, namespace: config.namespace });

  return db;
});

export const dbConnected = dbConnectFx.done;
export const dbFailConnected = dbConnectFx.fail;

export const dbAuthenticateFx = createEffect<null | Surreal, void, SurrealError>(async (db) => {
  if (!db) throw SurrealError.DatabaseOffline();

  const token = getDbTokenCookie();
  if (!token) throw SurrealError.DatabaseTokenMissing();

  await db.authenticate(token);
});

export const removeDbTokenCookieFx = createEffect(() => {
  removeDbTokenCookie();
});

sample({ clock: initDb, source: $dbConfig, target: dbConnectFx });

sample({
  clock: dbConnectFx.doneData,
  target: $db
});
