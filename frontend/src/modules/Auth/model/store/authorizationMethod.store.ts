import { createEffect, createEvent, createStore, sample, type StoreWritable } from "effector";
import { not, and, every, or, reset } from "patronum";
import { z } from "zod";
import { getOAuthUrl, type TAuthProvider } from "@utils/query/getOAuthUrl.utils";
import { errorToastDisplay } from "@widgets/ToastContainer/index";
import { redirectWithLocale } from "@i18n/routing";
import { formInputFactory } from "@utils/formInputFactory";

import { requestPkceFx, requestVerificationCodeFx, type TPkceResponse } from "../api";

import { $email, modalAuthClear, modalAuthClose, modalAuthToVerificationCode } from "./auth.store";
import { $inputRef } from "./verificationCode.store";

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

export const $redirectPending = or(requestPkceFx.pending, completeOauthRedirectFx.pending);
export const $emailPending = requestVerificationCodeFx.pending;
export const $modalDisabled = or($emailPending, $redirectPending);

reset({
  clock: [
    modalAuthClose,
    modalAuthClear,
    modalAuthToVerificationCode,
    completeOauthRedirectFx.done
  ],
  target: [$provider, $codeChallenge, $emailInputError, $emailInput, $inputRef]
});

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

sample({
  clock: oauthRedirect,
  filter: not($modalDisabled),
  target: [$provider, requestPkceFx]
});

sample({
  clock: requestPkceFx.doneData,
  fn: (result: TPkceResponse) => {
    const { codeChallenge } = result;

    return codeChallenge;
  },
  target: $codeChallenge
});

sample({
  clock: requestPkceFx.failData,
  fn: (error) => ({ key: error, namespace: "auth.authorizationMethodContent" }),
  target: errorToastDisplay
});

sample({
  source: {
    provider: $provider as StoreWritable<TAuthProvider>,
    codeChallenge: $codeChallenge as StoreWritable<string>
  },
  filter: every({ stores: [$provider, $codeChallenge], predicate: (value) => value !== null }),
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
