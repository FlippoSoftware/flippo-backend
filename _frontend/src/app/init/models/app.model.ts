import { $i18n, $isReady, initI18next } from '@settings/i18next/i18next.config';
import { createEffect, createEvent, sample } from 'effector';
import { and, not } from 'patronum';

// #region init
export const initApp = createEvent();
const initAppFx = createEffect(async () => {});

const $i18nNotNull = $i18n.map((instance) => !!instance);
const $initAppProcess = initAppFx.pending;
export const $initialized = and(not($initAppProcess), $isReady, $i18nNotNull);

sample({
  clock: initApp,
  target: [initI18next, initAppFx]
});
// #endregion

// #region teardown
export const teardownApp = createEvent();
const teardownI18nextFx = createEffect(() => {});

sample({
  clock: teardownApp,
  target: teardownI18nextFx
});
// #endregion
