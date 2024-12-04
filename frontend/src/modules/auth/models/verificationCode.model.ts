import { $t } from '@settings/i18next';
import * as sessionApi from '@settings/session';
import { type TVerifyInputHandler } from '@shared/ui/Input';
import { displayRequestError, displayRequestSuccess, type TTranslationOptions } from '@widgets/ToastNotification';
import { attach, createEffect, createEvent, createStore, sample, split } from 'effector';
import { and, not, or, reset } from 'patronum';

import { checkVerificationCodeFx, requestVerificationCodeFx, signInWithEmailFx } from '../api';
import { TIMEOUT_IN_MILLISECONDS, TIMEOUT_IN_MINUTES } from '../constant';
import { getEmailProvider, type TEmailProvider } from '../utils/getEmailProvider';
import { $authEmail, authClose, authToAuthorizationMethod, authToInputUsername } from './auth.model';

const sessionValidateFx = attach({ effect: sessionApi.sessionValidateFx });

export const $emailProvider = createStore<null | TEmailProvider>(null);
export const $truncatedEmail = $authEmail.map((email) => {
  const maxEmailLength = 50;
  const reserveForDomainLength = 20;

  if (email.length < maxEmailLength) return email;

  const [local, domain] = email.split('@');

  const localLength = local.length;

  if (localLength > maxEmailLength - reserveForDomainLength) {
    const maxLocalLength = maxEmailLength - reserveForDomainLength - 4; // 1 - this @ character, 3 - this dots (...)

    const startLocal = local.slice(0, maxLocalLength >> 1);
    const endLocal = local.slice(-(maxLocalLength >> 1));

    return `${startLocal}...${endLocal}@${domain}`;
  }

  return email;
});

// #region of model description $verificationCode
export const $verificationCode = createStore<string>('');
export const $verificationCodeError = createStore<null | string>(null);
export const verificationCodeChanged = createEvent<string>();
export const verificationCodeSubmitted = createEvent();
export const verificationCodeErrorChanged = createEvent<null | string>();

export const $inputRef = createStore<null | TVerifyInputHandler>(null);
export const inputRefChanged = createEvent<TVerifyInputHandler>();

export const inputFocused = createEvent();
export const inputFocusedFx = createEffect<null | TVerifyInputHandler, void>((input) => {
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

export const $timer = createStore<NodeJS.Timeout | null>(null);
export const timerStart = createEvent();
export const timerEnd = createEvent();
const timerChanged = createEvent<NodeJS.Timeout>();

const timerStartFx = createEffect(() => {
  const timeStart = Date.now();

  timerChanged(
    setInterval(() => {
      const timeElapsed = Date.now() - timeStart;
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

const timerClear = createEvent();
const timerClearFx = createEffect<NodeJS.Timeout | null, void>((timer) => {
  if (timer) clearInterval(timer);
});
// #endregion

// #region of model description status
export const $checkVerificationCodeProcess = createStore<boolean>(false);
export const $signInProcess = signInWithEmailFx.pending;
export const $requestCodeProcess = requestVerificationCodeFx.pending;
export const $modalDisabled = or($checkVerificationCodeProcess, $signInProcess, $requestCodeProcess);

export const verificationCodeContentMounted = createEvent();

const throwAnError = createEvent<string>();
// #endregion

$verificationCodeError.reset(verificationCodeChanged);

reset({
  clock: [timerEnd, authToInputUsername, authToAuthorizationMethod, authClose],
  target: [$timer, $timeView]
});

reset({
  clock: [authToInputUsername, authToAuthorizationMethod, authClose],
  target: [$resendCodeDisabled, $verificationCode, $verificationCodeError, $inputRef, $emailProvider]
});

$verificationCode.on(verificationCodeChanged, (_, code) => code);
$inputRef.on(inputRefChanged, (_, inputRef) => inputRef);
$timer.on(timerChanged, (_, timer) => timer);
$timeView.on(timeViewChanged, (_, timeView) => timeView);
$checkVerificationCodeProcess.on(checkVerificationCodeFx.pending, (_, value) => value);

sample({
  clock: verificationCodeContentMounted,
  source: $authEmail,
  fn: (email) => {
    const provider = getEmailProvider(email);
    return provider;
  },
  target: [timerStart, $emailProvider]
});

sample({ clock: timerStart, filter: not($timer), fn: () => true, target: [timerStartFx, $resendCodeDisabled] });
sample({
  clock: timerEnd,
  filter: $timer.map((timer) => !!timer),
  fn: () => false,
  target: [timerClear, $resendCodeDisabled]
});

sample({
  clock: timerClear,
  source: $timer,
  filter: $timer.map((state) => !!state),
  target: timerClearFx
});

// #region of logic check verification code
sample({
  clock: verificationCodeSubmitted,
  source: { code: $verificationCode, email: $authEmail },
  filter: not($modalDisabled),
  target: checkVerificationCodeFx
});

sample({ clock: checkVerificationCodeFx.done, source: $authEmail, target: signInWithEmailFx });
sample({ clock: checkVerificationCodeFx.fail, target: inputFocused });

sample({
  clock: inputFocused,
  source: $inputRef,
  filter: $inputRef.map((inputRef) => !!inputRef),
  target: inputFocusedFx
});

split({
  source: checkVerificationCodeFx.failData,
  match: (value) => (['400', '410'].includes(value) ? 'verificationCodeError' : 'error'),
  cases: {
    verificationCodeError: verificationCodeErrorChanged,
    error: [throwAnError, authToAuthorizationMethod]
  }
});

sample({
  clock: verificationCodeErrorChanged,
  source: $t,
  filter: (t, error) => !!t && !!error,
  fn: (t, error) => {
    const code = error === '400' ? 'invalid' : 'expired';
    return t(`verificationCodeContent.verificationCode.inputError.${code}`, { ns: 'auth' });
  },
  target: $verificationCodeError
});

sample({
  clock: signInWithEmailFx.doneData,
  target: sessionValidateFx
});

sample({
  clock: sessionValidateFx.done,
  fn: (): TTranslationOptions<'auth'> => {
    return ['success.authorizedAgain', { ns: 'auth' }];
  },
  target: [displayRequestSuccess, authClose]
});

sample({
  clock: sessionValidateFx.failData,
  fn: (): TTranslationOptions<'auth'> => ['verificationCodeContent.error.invalidSession', { ns: 'auth' }],
  target: displayRequestError
});

split({
  source: signInWithEmailFx.failData,
  match: (value) => (value === '401' ? 'unauthorized' : 'error'),
  cases: {
    unauthorized: authToInputUsername,
    error: [throwAnError, authToAuthorizationMethod]
  }
});

sample({
  clock: throwAnError,
  fn: (error): TTranslationOptions => [`error.${error}` as any],
  target: displayRequestError
});
// #endregion

// #region of logic resend code
sample({
  clock: resendCode,
  source: $authEmail,
  filter: and(not($modalDisabled), $timer),
  target: requestVerificationCodeFx
});

sample({
  clock: requestVerificationCodeFx.done,
  target: [timerStart, inputFocused]
});

sample({
  clock: requestVerificationCodeFx.failData,
  fn: (error): TTranslationOptions => [`error.${error}` as any],
  target: displayRequestError
});
// #endregion
