import { createEffect, createEvent, createStore, sample, split } from "effector";
import { and, not, or, reset } from "patronum";
import { $session } from "@shared/models/session.store";
import { type TVerifyInputHandler } from "@ui/Input/InputVerificationCode/types/TInputVerificationCode";
import { getEmailProvider, type TEmailProvider } from "@modules/Auth/utils/getEmailProvider";
import { errorToastDisplay } from "@widgets/ToastNotification";

import { TIMEOUT_IN_MILLISECONDS, TIMEOUT_IN_MINUTES } from "../../constant";
import { checkVerificationCodeFx, signInWithEmailFx, requestVerificationCodeFx } from "../api";

import {
  $email,
  modalAuthClear,
  modalAuthClose,
  modalAuthToAuthorizationMethod,
  modalAuthToInputUsername
} from "./auth.store";

export const $emailProvider = createStore<TEmailProvider | null>(null);

// #region of model description $verificationCode
export const $verificationCode = createStore<string>("");
export const $verificationCodeError = createStore<null | string>(null);
export const verificationCodeChanged = createEvent<string>();
export const verificationCodeSubmitted = createEvent();

export const $inputRef = createStore<TVerifyInputHandler | null>(null);
export const inputRefChanged = createEvent<TVerifyInputHandler>();
export const inputFocusedFx = createEffect(() => {
  const input = $inputRef.getState();
  if (input) input.focus();
});

export const $resendCodeDisabled = createStore(false);
export const resendCode = createEvent();
// #endregion

// #region of model description timer
export const $timeView = createStore<{ minutes: number; seconds: number }>({
  minutes: TIMEOUT_IN_MINUTES,
  seconds: 0
});
const timeViewChanged = createEvent<{ minutes: number; seconds: number }>();

const $timeStart = createStore<number>(0);
const timeStartChanged = createEvent<number>();

export const $timer = createStore<null | NodeJS.Timeout>(null);
export const timerStart = createEvent();
export const timerEnd = createEvent();
const timerChanged = createEvent<NodeJS.Timeout>();

const timerStartFx = createEffect(() => {
  timeStartChanged(Date.now());

  timerChanged(
    setInterval(() => {
      const timeElapsed = Date.now() - $timeStart.getState();
      const timerProgress = TIMEOUT_IN_MILLISECONDS - timeElapsed;
      if (timerProgress <= 0) {
        timerEnd();
        return;
      }

      timeViewChanged({
        minutes: Math.floor(timerProgress / 60000),
        seconds: Math.floor((timerProgress % 60000) / 1000)
      });
    }, 1000)
  );
});

const timerClearFx = createEffect(() => {
  const timer = $timer.getState();
  if (timer) clearInterval(timer);
});
// #endregion

// #region of model description status
export const $checkVerificationCodeProcess = checkVerificationCodeFx.pending;
export const $signInProcess = signInWithEmailFx.pending;
export const $requestCodeProcess = requestVerificationCodeFx.pending;
export const $modalDisabled = or(
  $checkVerificationCodeProcess,
  $signInProcess,
  $requestCodeProcess
);

export const verificationCodeContentMounted = createEvent();

const throwAnError = createEvent<string>();
// #endregion

$verificationCodeError.reset(verificationCodeChanged);

reset({
  clock: [
    timerEnd,
    modalAuthToInputUsername,
    modalAuthToAuthorizationMethod,
    modalAuthClose,
    modalAuthClear
  ],
  target: [$timer, $timeView, $timeStart]
});

reset({
  clock: [modalAuthToInputUsername, modalAuthToAuthorizationMethod, modalAuthClose, modalAuthClear],
  target: [
    $resendCodeDisabled,
    $verificationCode,
    $verificationCodeError,
    $inputRef,
    $emailProvider
  ]
});

$verificationCode.on(verificationCodeChanged, (_, code) => code);
$inputRef.on(inputRefChanged, (_, inputRef) => inputRef);
$timer.on(timerChanged, (_, timer) => timer);
$timeStart.on(timeStartChanged, (_, timerStart) => timerStart);
$timeView.on(timeViewChanged, (_, timeView) => timeView);

sample({
  clock: verificationCodeContentMounted,
  source: $email,
  fn: (email) => {
    const provider = getEmailProvider(email);
    return provider;
  },
  target: [timerStart, $emailProvider]
});

sample({ clock: timerStart, fn: () => true, target: [timerStartFx, $resendCodeDisabled] });
sample({ clock: timerEnd, fn: () => false, target: [timerClearFx, $resendCodeDisabled] });

// #region of logic check verification code
sample({
  clock: verificationCodeSubmitted,
  source: { code: $verificationCode, email: $email },
  filter: not($modalDisabled),
  target: checkVerificationCodeFx
});

sample({ clock: checkVerificationCodeFx.done, source: $email, target: signInWithEmailFx });
sample({ clock: checkVerificationCodeFx.fail, target: inputFocusedFx });

split({
  source: checkVerificationCodeFx.failData,
  match: (value) => (["400", "410"].includes(value) ? "verificationCodeError" : "error"),
  cases: {
    verificationCodeError: $verificationCodeError,
    error: [throwAnError, modalAuthToAuthorizationMethod]
  }
});

sample({
  clock: signInWithEmailFx.doneData,
  target: [$session, modalAuthClose]
});

split({
  source: signInWithEmailFx.failData,
  match: (value) => (value === "401" ? "unauthorized" : "error"),
  cases: {
    unauthorized: modalAuthToInputUsername,
    error: [throwAnError, modalAuthToAuthorizationMethod]
  }
});

sample({
  clock: throwAnError,
  fn: (error) => ({ key: error, namespace: "auth.verificationCodeContent" }),
  target: errorToastDisplay
});
// #endregion

// #region of logic resend code
sample({
  clock: resendCode,
  source: $email,
  filter: and(not($modalDisabled), $timer),
  target: requestVerificationCodeFx
});

sample({
  clock: requestVerificationCodeFx.done,
  target: [timerStart, inputFocusedFx]
});

sample({
  clock: requestVerificationCodeFx.failData,
  fn: (error) => ({ key: error, namespace: "auth.verificationCodeContent" }),
  target: errorToastDisplay
});
// #endregion
