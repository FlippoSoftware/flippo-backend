import { createEvent, sample } from "effector";
import { and, not, or, reset } from "patronum";
import { z } from "zod";
import { sessionChanged } from "@shared/models/session.store";
import { errorToastDisplay } from "@widgets/ToastNotification";
import { formInputFactory } from "@shared/models/formInputFactory";

import { signUpWithEmailFx } from "../api";

import {
  $email,
  modalAuthClear,
  modalAuthClose,
  modalAuthToAuthorizationMethod
} from "./auth.store";

// #region of model description $usernameInput
const UsernameFieldSchema = z.string().min(1, "empty").min(2, "size");

export const {
  $usernameInput,
  $usernameInputRef,
  $usernameInputError,
  usernameInputBlur,
  usernameInputChanged,
  usernameInputErrorClear,
  usernameInputFocus,
  usernameInputFocusedDueError,
  usernameInputRefChanged,
  usernameInputValidate
} = formInputFactory<string, "username">({
  name: "username",
  initValue: "",
  schema: UsernameFieldSchema
});

export const usernameSubmitted = createEvent();
// #endregion

// #region of model description status
export const $userRegistration = signUpWithEmailFx.pending;
export const $modalAuthDisabled = or($userRegistration);
// #endregion

// #region of logic registration
reset({
  clock: [modalAuthClose, modalAuthToAuthorizationMethod, modalAuthClear],
  target: [$usernameInput, $usernameInputError]
});

sample({
  clock: usernameSubmitted,
  target: usernameInputValidate
});

sample({
  clock: usernameSubmitted,
  source: { username: $usernameInput, email: $email },
  filter: and(not($userRegistration), not($usernameInputError)),
  target: signUpWithEmailFx
});

sample({
  clock: signUpWithEmailFx.doneData,
  target: [sessionChanged, modalAuthClose]
});

sample({
  clock: signUpWithEmailFx.failData,
  fn: (error) => ({ key: error, namespace: "auth.inputUsernameContent" }),
  target: [errorToastDisplay, modalAuthToAuthorizationMethod]
});
// #endregion
