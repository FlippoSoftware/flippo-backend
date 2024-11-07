"use client";

import { useUnit } from "effector-react";
import {
  $emailInput,
  $emailInputError,
  $emailPending,
  $modalDisabled,
  $redirectPending,
  emailInputRefChanged,
  emailInputBlur,
  emailInputChanged,
  emailSubmitted,
  oauthRedirect
} from "@modules/Auth/model/store/authorizationMethod.store";
import { useEffect, useRef } from "react";

const useAuthorizationMethodContent = () => {
  const [
    emailInput,
    emailInputError,
    modalDisabled,
    redirectPending,
    emailPending,
    onEmailInputRefChanged,
    onEmailInputBlur,
    onEmailInputChanged,
    onEmailSubmitted,
    onOauthRedirect
  ] = useUnit([
    $emailInput,
    $emailInputError,
    $modalDisabled,
    $redirectPending,
    $emailPending,
    emailInputRefChanged,
    emailInputBlur,
    emailInputChanged,
    emailSubmitted,
    oauthRedirect
  ]);
  const emailInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (emailInputRef.current) onEmailInputRefChanged(emailInputRef.current);
  }, [onEmailInputRefChanged]);

  return {
    emailInput,
    emailInputRef,
    emailInputError,
    modalDisabled,
    redirectPending,
    emailPending,
    onEmailInputRefChanged,
    onEmailInputBlur,
    onEmailInputChanged,
    onEmailSubmitted,
    onOauthRedirect
  };
};

export { useAuthorizationMethodContent };
