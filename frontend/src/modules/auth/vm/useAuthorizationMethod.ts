'use client';

import { useUnit } from 'effector-react';
import { useEffect, useRef } from 'react';

import {
  $contentDisabled,
  $emailInput,
  $emailInputError,
  $emailPending,
  $redirectPending,
  emailInputBlur,
  emailInputChanged,
  emailInputRefChanged,
  emailSubmitted,
  oauthRedirect
} from '../models/authorizationMethod.model';

const useAuthorizationMethod = () => {
  const [
    emailInput,
    emailInputError,
    contentDisabled,
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
    $contentDisabled,
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
    contentDisabled,
    emailInput,
    emailInputError,
    emailInputRef,
    emailPending,
    onEmailInputBlur,
    onEmailInputChanged,
    onEmailSubmitted,
    onOauthRedirect,
    redirectPending
  };
};

export { useAuthorizationMethod };
