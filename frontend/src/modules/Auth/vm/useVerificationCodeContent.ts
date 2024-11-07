"use client";

import { useEffect, useRef } from "react";
import { useUnit } from "effector-react";

import {
  $checkVerificationCodeProcess,
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
} from "@modules/Auth/model/store/verificationCode.store";
import { $email, modalAuthToAuthorizationMethod } from "@modules/Auth/model/store/auth.store";
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
    onVerificationCodeChanged,
    onResendCode,
    onModalToAuthorizationMethod,
    verifyInputRef,
    onVerificationCodeSubmitted
  };
};

export { useVerificationCodeContent };
