'use client';

import { type TVerifyInputHandler } from '@shared/ui/Input';
import { useUnit } from 'effector-react';
import { useEffect, useRef } from 'react';

import { $authEmail, authToAuthorizationMethod } from '../models/auth.model';
import {
  $checkVerificationCodeProcess,
  $emailProvider,
  $modalDisabled,
  $requestCodeProcess,
  $resendCodeDisabled,
  $timer,
  $timeView,
  $verificationCodeError,
  inputRefChanged,
  resendCode,
  verificationCodeChanged,
  verificationCodeContentMounted,
  verificationCodeSubmitted
} from '../models/verificationCode.model';

const useVerificationCode = () => {
  const [
    timeView,
    modalDisabled,
    timer,
    email,
    emailProvider,
    verificationCodeError,
    checkVerificationCodeProcess,
    requestCodeProcess,
    resendCodeDisabled,
    onVerificationCodeContentMounted,
    onVerificationCodeChanged,
    onResendCode,
    onModalToAuthorizationMethod,
    onInputRefChanged,
    onVerificationCodeSubmitted
  ] = useUnit([
    $timeView,
    $modalDisabled,
    $timer,
    $authEmail,
    $emailProvider,
    $verificationCodeError,
    $checkVerificationCodeProcess,
    $requestCodeProcess,
    $resendCodeDisabled,
    verificationCodeContentMounted,
    verificationCodeChanged,
    resendCode,
    authToAuthorizationMethod,
    inputRefChanged,
    verificationCodeSubmitted
  ]);
  const verifyInputRef = useRef<null | TVerifyInputHandler>(null);

  useEffect(() => {
    onVerificationCodeContentMounted();

    if (verifyInputRef.current) onInputRefChanged(verifyInputRef.current);
  }, [onVerificationCodeContentMounted, onInputRefChanged]);

  return {
    checkVerificationCodeProcess,
    email,
    emailProvider,
    modalDisabled,
    onModalToAuthorizationMethod,
    onResendCode,
    onVerificationCodeChanged,
    onVerificationCodeSubmitted,
    requestCodeProcess,
    resendCodeDisabled,
    timer,
    timeView,
    verificationCodeError,
    verifyInputRef
  };
};

export { useVerificationCode };
