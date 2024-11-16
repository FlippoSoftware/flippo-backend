import { createEffect, createEvent, createStore, sample } from "effector";
import { not, and, or, reset } from "patronum";
import { z } from "zod";
import { getOAuthUrl, type TAuthProvider } from "@shared/query/getOAuthUrl.utils";
import { errorToastDisplay } from "@widgets/ToastNotification/index";
import { redirectWithLocale } from "@i18n/routing";
import { formInputFactory } from "@shared/models/formInputFactory";

import { requestPkceFx, requestVerificationCodeFx, type TPkceResponse } from "../api";

import { $email, modalAuthClear, modalAuthClose, modalAuthToVerificationCode } from "./auth.store";

// #region of model description $emailInput
const EmailFieldSchema = z.string().min(1, "empty").email("invalid");

export const {
  $emailInput,
  $emailInputRef,
  $emailInputError,
  emailInputChanged,
  emailInputRefChanged,
  emailInputFocus,
  emailInputFocusedDueError,
  emailInputBlur,
  emailInputErrorClear,
  emailInputValidate
} = formInputFactory<string, "email">({
  name: "email",
  source: $email,
  schema: EmailFieldSchema
});

export const emailSubmitted = createEvent();
// #endregion

// #region of model description oauthRedirect
export const $provider = createStore<null | TAuthProvider>(null);
export const $codeChallenge = createStore<null | string>(null);

export const oauthRedirect = createEvent<TAuthProvider>();
export const completeOauthRedirectFx = createEffect<
  { provider: TAuthProvider; codeChallenge: string },
  string
>(({ provider, codeChallenge }) => {
  const redirectUrl = getOAuthUrl({ provider, codeChallenge });

  return redirectUrl;
});
// #endregion

// #region of model description status
export const $redirectPending = or(requestPkceFx.pending, completeOauthRedirectFx.pending);
export const $emailPending = requestVerificationCodeFx.pending;
export const $modalDisabled = or($emailPending, $redirectPending);
// #endregion

reset({
  clock: [
    modalAuthClose,
    modalAuthClear,
    modalAuthToVerificationCode,
    completeOauthRedirectFx.done
  ],
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
  filter: and(not($emailInputError), not($modalDisabled)),
  target: requestVerificationCodeFx
});

sample({
  clock: requestVerificationCodeFx.done,
  target: modalAuthToVerificationCode
});

sample({
  clock: requestVerificationCodeFx.failData,
  fn: (error) => ({ key: error, namespace: "auth.authorizationMethodContent" }),
  target: errorToastDisplay
});
// #endregion

// #region of logic signin with oauth
sample({
  clock: oauthRedirect,
  filter: not($modalDisabled),
  target: [$provider, requestPkceFx]
});

sample({
  clock: requestPkceFx.doneData,
  source: $provider,
  filter: (src, result) => !!src && !!result,
  fn: (provider, result: TPkceResponse) => {
    const { codeChallenge } = result;

    return { provider: provider as TAuthProvider, codeChallenge };
  },
  target: completeOauthRedirectFx
});

sample({
  clock: completeOauthRedirectFx.finally,
  fn: async (value) => {
    switch (value.status) {
      case "done":
        await redirectWithLocale(value.result);
        break;
      default:
        break;
    }
  }
});

sample({
  clock: requestPkceFx.failData,
  fn: (error) => ({ key: error, namespace: "auth.authorizationMethodContent" }),
  target: errorToastDisplay
});
// #endregion
