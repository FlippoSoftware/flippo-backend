"use client";

import axios from "axios";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { getOAuthUrl } from "@utils/query/getOAuthUrl.utils";
import { AppEnv } from "@env/app.env";
import { BusinessError } from "@utils/exceptions/business.error";

import type { TAuthProvider } from "@utils/query/getOAuthUrl.utils";
import type { TState } from "../types/TState";
import type { TEmailForm } from "../types/TEmailForm";

const useAuth = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [error, setError] = useState<string>("");
  const [isRedirecting, setIsRedirecting] = useState<boolean>(false);

  const emailDefaultValue = searchParams.get("email") || "";

  useEffect(() => {
    localStorage.setItem("urlCallback", searchParams.get("urlCallback") as string);
  }, [searchParams]);

  const redirectToOAuthProvider = async (provider: TAuthProvider) => {
    try {
      setError("");
      setIsRedirecting(true);

      const response = await axios.get(`${AppEnv.NEXT_PUBLIC_API_BASE_URL}/pkce`, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        withCredentials: true
      });

      const { codeChallenge } = response.data;

      const oauthURL = getOAuthUrl({ provider, codeChallenge });

      router.push(oauthURL);
    } catch (error: any) {
      if (error instanceof BusinessError) setError(error.message);

      setIsRedirecting(false);
      setError(BusinessError.ServerErrorMessage);
    }
  };
  const submitEmail = async (formData: TEmailForm, changeState: (state: TState) => void) => {
    try {
      setError("");

      await axios.post(
        `${AppEnv.NEXT_PUBLIC_API_BASE_URL}/generate_code_verify`,
        { email: formData.email },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true
        }
      );

      changeState("verifyCode");
    } catch (error: any) {
      if (error instanceof BusinessError) setError(error.message);

      setError(BusinessError.ServerErrorMessage);
    }
  };

  return {
    error,
    emailDefaultValue,
    router,
    isRedirecting,
    redirectToOAuthProvider,
    submitEmail
  };
};

export { useAuth };
