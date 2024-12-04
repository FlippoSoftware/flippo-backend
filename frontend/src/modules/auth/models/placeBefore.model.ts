import { router } from '@settings/routing';
import { type HistoryPushParams } from 'atomic-router';
import { createEffect, createEvent, sample } from 'effector';

const CALLBACK_URL_NAME = 'callbackUrl';

export const rememberPlaceBeforeAuthorization = createEvent();
const rememberPlaceFx = createEffect<string, void>((url) => {
  localStorage.setItem(CALLBACK_URL_NAME, url);
});

export const placeBeforeAuthorization = createEvent();
const getPlaceFx = createEffect(() => {
  const url = localStorage.getItem(CALLBACK_URL_NAME);
  localStorage.removeItem(CALLBACK_URL_NAME);

  return url || '/';
});

sample({
  clock: rememberPlaceBeforeAuthorization,
  source: router.$path,
  target: rememberPlaceFx
});

sample({
  clock: placeBeforeAuthorization,
  target: getPlaceFx
});

sample({
  clock: getPlaceFx.doneData,
  fn: (url) => ({ path: url, method: 'replace' }) as Omit<HistoryPushParams, 'history'>,
  target: router.push
});
