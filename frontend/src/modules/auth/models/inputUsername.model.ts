import { authRoute } from '@settings/routing';
import { sessionChanged } from '@settings/session';
import { createFormInput } from '@shared/factories';
import { displayRequestError, displayRequestSuccess, type TTranslationOptions } from '@widgets/ToastNotification';
import { attach, createEvent, sample } from 'effector';
import { not, reset } from 'patronum';
import { z } from 'zod';

import * as authApi from '../api';
import { $authEmail, authClose, authToAuthorizationMethod, authToPending } from './auth.model';
import { placeBeforeAuthorization } from './placeBefore.model';

const signUpWithEmailFx = attach({ effect: authApi.signUpWithEmailFx });

// #region of model description $usernameInput
const UsernameFieldSchema = z.string().min(1, 'empty').min(2, 'size');

export const {
  $usernameInput,
  $usernameInputError,
  $usernameInputRef,
  usernameInputBlur,
  usernameInputChanged,
  usernameInputErrorClear,
  usernameInputFocus,
  usernameInputFocusedDueError,
  usernameInputRefChanged,
  usernameInputValidate
} = createFormInput<string, 'username'>('username', '', UsernameFieldSchema);

export const usernameSubmitted = createEvent();
// #endregion

// #region of logic registration
reset({
  clock: [authRoute.closed, authToAuthorizationMethod],
  target: [$usernameInput, $usernameInputError]
});

sample({
  clock: usernameSubmitted,
  target: usernameInputValidate
});

sample({
  clock: usernameSubmitted,
  source: { username: $usernameInput, email: $authEmail },
  filter: not($usernameInputError),
  target: signUpWithEmailFx
});

sample({
  clock: signUpWithEmailFx,
  target: authToPending
});

sample({
  clock: signUpWithEmailFx.doneData,
  target: [sessionChanged, authClose]
});

sample({
  clock: signUpWithEmailFx.done,
  fn: (): TTranslationOptions<'auth'> => [`success.authorized`, { ns: 'auth' }],
  target: [displayRequestSuccess, placeBeforeAuthorization]
});

sample({
  clock: signUpWithEmailFx.failData,
  fn: (error): TTranslationOptions => [`error.${error}` as any],
  target: [displayRequestError, authToAuthorizationMethod]
});
// #endregion
