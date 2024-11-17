"use client";

import { useEffect, useRef } from "react";
import { useUnit } from "effector-react";
import {
  $checkVerificationCodeProcess,
  $requestCodeProcess,
  $resendCodeDisabled,
  $emailProvider,
  $modalDisabled,
  $timer,
  $timeView,
  $verificationCodeError,
  inputRefChanged,
  resendCode,
  verificationCodeChanged,
  verificationCodeContentMounted,
  verificationCodeSubmitted
} from "@modules/Auth/vm/models/verificationCode.store";
import { $email, modalAuthToAuthorizationMethod } from "@modules/Auth/vm/models/auth.store";
import { type TVerifyInputHandler } from "@ui/Input/InputVerificationCode/types/TInputVerificationCode";

const useVerificationCodeContent = () => {
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
    $email,
    $emailProvider,
    $verificationCodeError,
    $checkVerificationCodeProcess,
    $requestCodeProcess,
    $resendCodeDisabled,
    verificationCodeContentMounted,
    verificationCodeChanged,
    resendCode,
    modalAuthToAuthorizationMethod,
    inputRefChanged,
    verificationCodeSubmitted
  ]);
  const verifyInputRef = useRef<TVerifyInputHandler | null>(null);

  useEffect(() => {
    onVerificationCodeContentMounted();

    if (verifyInputRef.current) onInputRefChanged(verifyInputRef.current);
  }, [onVerificationCodeContentMounted, onInputRefChanged]);

  return {
    timeView,
    modalDisabled,
    timer,
    email,
    emailProvider,
    verificationCodeError,
    checkVerificationCodeProcess,
    requestCodeProcess,
    resendCodeDisabled,
    onVerificationCodeChanged,
    onResendCode,
    onModalToAuthorizationMethod,
    verifyInputRef,
    onVerificationCodeSubmitted
  };
};

export { useVerificationCodeContent };
