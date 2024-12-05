import { router } from '@settings/routing';
import { createFormInput } from '@shared/factories';
import { getOAuthUrl, type TAuthProvider } from '@shared/query';
import { displayRequestError, type TTranslationOptions } from '@widgets/ToastNotification';
import { type HistoryPushParams } from 'atomic-router';
import { attach, createEffect, createEvent, createStore, sample } from 'effector';
import { and, not, or, reset } from 'patronum';
import { z } from 'zod';

import * as authApi from '../api';
import { $authEmail, authClose, authToVerificationCode } from './auth.model';

const requestPkceFx = attach({ effect: authApi.requestPkceFx });
const requestVerificationCodeFx = attach({ effect: authApi.requestVerificationCodeFx });

// #region of model description $emailInput
const EmailFieldSchema = z.string().min(1, 'empty').email('invalid');

export const {
  $emailInput,
  $emailInputError,
  $emailInputRef,
  emailInputBlur,
  emailInputChanged,
  emailInputErrorClear,
  emailInputFocus,
  emailInputFocusedDueError,
  emailInputRefChanged,
  emailInputValidate
} = createFormInput<string, 'email'>('email', '', EmailFieldSchema);

export const emailSubmitted = createEvent();
// #endregion

// #region of model description oauthRedirect
export const $provider = createStore<null | TAuthProvider>(null);
export const $codeChallenge = createStore<null | string>(null);

export const oauthRedirect = createEvent<TAuthProvider>();
export const completeOauthRedirectFx = createEffect<{ codeChallenge: string; provider: TAuthProvider }, string>(
  ({ codeChallenge, provider }) => {
    const redirectUrl = getOAuthUrl({ codeChallenge, provider });

    return redirectUrl;
  }
);
// #endregion

// #region of model description status
export const $redirectPending = or(requestPkceFx.pending, completeOauthRedirectFx.pending);
export const $emailPending = requestVerificationCodeFx.pending;
export const $contentDisabled = or($emailPending, $redirectPending);
// #endregion

reset({
  clock: [authClose, authToVerificationCode, completeOauthRedirectFx.done],
  target: [$provider, $codeChallenge, $emailInputError, $emailInput]
});

// #region of logic signin with email
sample({
  clock: emailSubmitted,
  target: emailInputValidate
});

sample({
  clock: emailSubmitted,
  source: $emailInput,
  filter: and(not($emailInputError), not($contentDisabled)),
  target: requestVerificationCodeFx
});

sample({
  clock: requestVerificationCodeFx.done,
  source: $emailInput,
  target: [$authEmail, authToVerificationCode]
});

sample({
  clock: requestVerificationCodeFx.failData,
  fn: (error): TTranslationOptions => [`error.${error}` as any],
  target: displayRequestError
});
// #endregion

// #region of logic signin with oauth
sample({
  clock: oauthRedirect,
  filter: not($contentDisabled),
  target: [$provider, requestPkceFx]
});

sample({
  clock: requestPkceFx.doneData,
  source: $provider,
  filter: (src, result) => !!src && !!result,
  fn: (provider, result: authApi.TPkceResponse) => {
    const { codeChallenge } = result;

    return { provider: provider as TAuthProvider, codeChallenge };
  },
  target: completeOauthRedirectFx
});

sample({
  clock: completeOauthRedirectFx.doneData,
  fn: (url) => {
    return { path: url, method: 'push' } as Omit<HistoryPushParams, 'history'>;
  },
  target: router.push
});

sample({
  clock: requestPkceFx.failData,
  fn: (error): TTranslationOptions => [`error.${error}` as any],
  target: displayRequestError
});
// #endregion
