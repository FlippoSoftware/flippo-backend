import type Surreal from 'surrealdb';

import { createEffect, createEvent, createStore, sample } from 'effector';

export function createRequest<Result extends unknown[], Bindings extends Record<string, unknown>>(query: string) {
  const request = createEvent<{ bindings?: Bindings; db: Surreal }>();
  const $data = createStore<null | Result>(null);

  const requestFx = createEffect<{ bindings?: Bindings; db: Surreal }, Result>(async ({ bindings, db }) => {
    return await db.query<Result>(query, bindings);
  });

  const $pending = requestFx.pending;

  sample({
    clock: request,
    target: requestFx
  });

  return { $data, $pending, fail: requestFx.fail, request };
}
