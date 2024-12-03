import { authRoute } from '@settings/routing';
import { createEvent, createStore, sample } from 'effector';
import { reset } from 'patronum';

import { type TAuthContent } from '../types/TAuthContent';
import { placeBeforeAuthorization, rememberPlaceBeforeAuthorization } from './placeBefore.model';

// #region model description "auth modal"
export const authClose = createEvent();
export const $authContent = createStore<TAuthContent>('authorizationMethod');

export const authTo = createEvent<TAuthContent>();
export const authToAuthorizationMethod = createEvent();
export const authToVerificationCode = createEvent();
export const authToInputUsername = createEvent();

// #endregion

// #region model description $email
export const $authEmail = createStore<string>('');
// #endregion

// #region of logic "auth modal"
reset({ clock: authRoute.closed, target: [$authEmail, $authContent] });

$authContent.on(authTo, (value) => value);
$authContent.on(authToAuthorizationMethod, () => 'authorizationMethod');
$authContent.on(authToVerificationCode, () => 'verificationCode');
$authContent.on(authToInputUsername, () => 'inputUsername');

sample({ clock: authRoute.open, target: rememberPlaceBeforeAuthorization });

sample({
  clock: authClose,
  target: placeBeforeAuthorization
});
// #endregion
