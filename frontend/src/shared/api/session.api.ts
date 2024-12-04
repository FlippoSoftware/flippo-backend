import { type TSession } from '@settings/session';
import { createEffect } from 'effector';

import { requestFx } from './request.api';

export const sessionAuthFx = createEffect<void, TSession, string>(() => {
  return requestFx({
    method: 'GET',
    options: {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true
    },
    url: '/auth'
  });
});

export const sessionRefreshFx = createEffect<void, void, string>(() => {
  return requestFx({
    method: 'GET',
    options: {
      withCredentials: true
    },
    url: '/auth/refresh_token/refresh'
  });
});

export const sessionSignOutFx = createEffect<void, void, string>(() => {
  return requestFx({
    method: 'POST',
    options: {
      withCredentials: true
    },
    url: '/auth/refresh_token/signout'
  });
});

export const requestDbTokenFx = createEffect<void, void, string>(() => {
  return requestFx({
    method: 'GET',
    options: {
      withCredentials: true
    },
    url: '/auth/token_db'
  });
});
