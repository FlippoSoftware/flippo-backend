import { authRoute } from '@settings/routing';
import { sessionChanged } from '@settings/session';
import { createFormInput } from '@shared/factories';
import { displayRequestError } from '@widgets/ToastNotification';
import { createEvent, sample } from 'effector';
import { and, not, or, reset } from 'patronum';
import { z } from 'zod';

import { signUpWithEmailFx } from '../api';
import { $authEmail, authClose, authToAuthorizationMethod } from './auth.model';

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

// #region of model description status
export const $userRegistration = signUpWithEmailFx.pending;
export const $authDisabled = or($userRegistration);
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
  filter: and(not($userRegistration), not($usernameInputError)),
  target: signUpWithEmailFx
});

sample({
  clock: signUpWithEmailFx.doneData,
  target: [sessionChanged, authClose]
});

sample({
  clock: signUpWithEmailFx.failData,
  target: [displayRequestError, authToAuthorizationMethod]
});
// #endregion
