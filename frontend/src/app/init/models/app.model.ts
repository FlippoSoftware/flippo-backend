import { $i18n, $isReady, initI18next } from '@settings/i18next';
import { initRouter } from '@settings/routing';
import { sessionAuth } from '@settings/session';
import {
  $db,
  dbFailConnected,
  initDb,
  dbAuthenticateFx as originDbAuthenticateFx,
  dbDisconnectFx as originDbDisconnectFx,
  type SurrealError
} from '@settings/surreal';
import { sessionAuthFx } from '@shared/api';
import { attach, createEffect, createEvent, merge, sample, split } from 'effector';
import { and, delay, not } from 'patronum';

const dbAuthenticateFx = attach({ effect: originDbAuthenticateFx });
const dbDisconnectFx = attach({ effect: originDbDisconnectFx });

// #region init
export const initApp = createEvent();
const initAppFx = createEffect(async () => {});

const $i18nNotNull = $i18n.map((instance) => !!instance);
const $initAppProcess = initAppFx.pending;
export const $initialized = and(not($initAppProcess), $isReady, $i18nNotNull);

const dbAuth = createEvent();
const dbReconnect = createEvent();
const $dbAuthenticateProcess = dbAuthenticateFx.pending;

sample({
  clock: initApp,
  target: [initI18next, initAppFx, initRouter, initDb, sessionAuth]
});

sample({
  clock: sessionAuthFx.done,
  target: dbAuth
});

sample({
  clock: dbAuth,
  source: $db,
  filter: not($dbAuthenticateProcess),
  target: dbAuthenticateFx
});

split({
  source: dbAuthenticateFx.failData,
  match: (error: SurrealError) => error.code,
  cases: {
    ERR_OFFLINE: dbReconnect,
    ERR_TOKEN_MISSING: sessionAuthFx
  }
});

delay({
  source: merge([dbFailConnected, dbReconnect]),
  target: initDb,
  timeout: 5000
});
// #endregion

// #region teardown
export const teardownApp = createEvent();
const teardownI18nextFx = createEffect(() => {});

sample({
  clock: teardownApp,
  target: [teardownI18nextFx, dbDisconnectFx]
});
// #endregion
