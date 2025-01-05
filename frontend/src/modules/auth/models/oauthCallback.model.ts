import { authRoute, callbackRoute, mainRoute } from '@settings/routing';
import { $session, sessionValidateFx as sideSessionValidateFx } from '@settings/session';
import * as sessionApi from '@shared/api';
import { type NavigateParams } from 'atomic-router';
import { attach, createEvent, createStore, sample } from 'effector';

import { placeBeforeAuthorization } from './placeBefore.model';

export enum OauthStatus {
  Pending = 0,
  Success,
  Fail
}

const sessionAuthFx = attach({ effect: sessionApi.sessionAuthFx });
const sessionValidateFx = attach({ effect: sideSessionValidateFx });

export const $oauthCallbackStatus = createStore<OauthStatus>(OauthStatus.Pending);
export const $errorMessage = createStore<string>('');

export const tryAgain = createEvent();
export const canceled = createEvent();

// #region opened
$oauthCallbackStatus.on(sessionAuthFx, () => OauthStatus.Pending);
$oauthCallbackStatus.on(sessionValidateFx.done, () => OauthStatus.Success);
$oauthCallbackStatus.on(sessionAuthFx.fail, () => OauthStatus.Fail);
$oauthCallbackStatus.on(sessionValidateFx.fail, () => OauthStatus.Fail);

sample({
  clock: callbackRoute.opened,
  target: [sessionAuthFx]
});

sample({
  clock: sessionAuthFx.doneData,
  target: sessionValidateFx
});

// #region session validate
sample({
  clock: sessionValidateFx.doneData,
  target: $session
});

sample({
  clock: sessionValidateFx.done,
  fn: () => ({ replace: true }) as NavigateParams<object>,
  target: mainRoute.navigate
});

sample({
  clock: sessionValidateFx.fail,
  fn: () => 'invalidSession',
  target: $errorMessage
});
// #endregion

sample({
  clock: sessionAuthFx.fail,
  fn: () => '401',
  target: $errorMessage
});
// #endregion

// #region routing
sample({
  clock: tryAgain,
  fn: () => ({ replace: true }) as NavigateParams<object>,
  target: authRoute.navigate
});

sample({
  clock: canceled,
  target: placeBeforeAuthorization
});
// #endregion
