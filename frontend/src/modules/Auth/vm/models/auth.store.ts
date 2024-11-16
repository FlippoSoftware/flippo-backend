import { createEffect, createEvent, createStore, sample } from "effector";
import { reset } from "patronum";
import { type TModalContent } from "@modules/Auth/types/TModalContent";
import { redirectWithLocale } from "@i18n/routing";

// #region model description "auth modal"
export const $modalAuthContent = createStore<TModalContent>("authorizationMethod");

export const modalAuthTo = createEvent<TModalContent>();
export const modalAuthToAuthorizationMethod = createEvent();
export const modalAuthToVerificationCode = createEvent();
export const modalAuthToInputUsername = createEvent();
export const modalAuthToOauthCallback = createEvent();

export const modalAuthOpen = createEvent();
const modalAuthOpenFx = createEffect(async () => {
  const callbackUrl = window.location.href;
  localStorage.setItem("callbackUrl", callbackUrl);
});

export const modalAuthClose = createEvent();
const modalAuthCloseFx = createEffect<void, string>(async () => {
  const callbackUrl = localStorage.getItem("callbackUrl");
  localStorage.removeItem("callbackUrl");

  return callbackUrl || "/";
});

export const modalAuthClear = createEvent();

export const $modalWindowOpens = modalAuthOpenFx.pending;
// #endregion

// #region model description $email
export const $email = createStore<string>("");
// #endregion

// #region of logic "auth modal"
reset({ clock: [modalAuthClose, modalAuthClear], target: [$email, $modalAuthContent] });

$modalAuthContent.on(modalAuthTo, (value) => value);
$modalAuthContent.on(modalAuthToAuthorizationMethod, () => "authorizationMethod");
$modalAuthContent.on(modalAuthToVerificationCode, () => "verificationCode");
$modalAuthContent.on(modalAuthToInputUsername, () => "inputUsername");
$modalAuthContent.on(modalAuthToOauthCallback, () => "oauthCallback");

sample({ clock: modalAuthOpen, target: modalAuthOpenFx });
sample({ clock: modalAuthClose, target: modalAuthCloseFx });

sample({
  clock: modalAuthOpenFx.finally,
  fn: async () => await redirectWithLocale("/auth")
});

sample({
  clock: modalAuthCloseFx.finally,
  fn: async (value) => {
    switch (value.status) {
      case "done":
        await redirectWithLocale(value.result);
        break;
      default:
        await redirectWithLocale("/");
        break;
    }
  }
});
// #endregion
