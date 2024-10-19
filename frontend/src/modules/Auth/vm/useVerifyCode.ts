"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import axios, { AxiosError } from "axios";

import { getEmailProviders } from "@modules/Auth/utils/getEmailProvider";
import { AppEnv } from "@env/app.env";
import {
  type TVerifyInputHandler,
  type TCompletedResult
} from "@ui/Input/InputVerificationCode/types/TInputVerificationCode";

import { type TEmailProviders } from "../types/TEmail";
import { type TState } from "../types/TState";

const useVerifyCode = () => {
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [provider, setProvider] = useState<{ redirectURL: string; name: TEmailProviders } | null>(
    null
  );

  const [error, setError] = useState<string>();
  const [isCheckingCode, setIsCheckingCode] = useState<boolean>(false);
  const [isResending, setIsResending] = useState<boolean>(false);

  const time = 60 * 5; // 5min
  const [timeLeft, setTimeLeft] = useState<number>(time); // 5 min
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const verifyInputRef = useRef<TVerifyInputHandler | null>(null);

  const startTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);

    timerRef.current = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          if (timerRef.current) clearInterval(timerRef.current);

          return 0;
        }

        return prevTime - 1;
      });
    }, 1000);
  };

  useEffect(() => {
    if (searchParams.has("email")) {
      setEmail(searchParams.get("email") as string);
      setProvider(getEmailProviders(email));
    }

    startTimer();

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [email, searchParams]);

  const codeValidation = useCallback(
    async (code: string, changeState: (state: TState) => void): Promise<TCompletedResult> => {
      try {
        setIsCheckingCode(true);

        await axios.post(
          `${AppEnv.NEXT_PUBLIC_API_BASE_URL}/check_code_verify`,
          { code, email },
          {
            headers: { "Content-Type": "application/json" },
            withCredentials: true
          }
        );

        return {
          ok: true,
          error: undefined,
          callback: async () => {
            try {
              await axios.post(
                `${AppEnv.NEXT_PUBLIC_API_BASE_URL}/sign_in_with_email`,
                { email },
                { headers: { "Content-Type": "application/json" }, withCredentials: true }
              );
            } catch (error) {
              if (error instanceof AxiosError) {
                if (error.status === 401) changeState("inputUsername");
              }
            }
          }
        };
      } catch (error: any) {
        let errorMessage: string = "Ой! Что-то пошло не так.";
        if (error instanceof AxiosError) {
          if (error.status === 400) errorMessage = "Неверный код.";
          if (error.status === 410) {
            errorMessage = "Срок действия кода истёк.";
            console.log(errorMessage);
          }
        }

        return { ok: false, error: errorMessage };
      } finally {
        setIsCheckingCode(false);
      }
    },
    [email]
  );

  const reSendCode = useCallback(async () => {
    try {
      setIsResending(true);
      await axios.post(
        `${AppEnv.NEXT_PUBLIC_API_BASE_URL}/generate_code_verify`,
        { email },
        { headers: { "Content-Type": "application/json" }, withCredentials: true }
      );

      setTimeLeft(time);
      startTimer();

      if (verifyInputRef.current) {
        verifyInputRef.current.focus();
      }
    } catch (error: any) {
      setError(error.message);
    } finally {
      setIsResending(false);
    }
  }, [email, time]);

  return {
    error,
    email,
    provider,
    isCheckingCode,
    isResending,
    timeLeft,
    verifyInputRef,
    reSendCode,
    codeValidation
  };
};

export { useVerifyCode };
