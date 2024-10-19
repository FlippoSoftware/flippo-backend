import axios from "axios";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

import { AppEnv } from "@env/app.env";
import { BusinessError } from "@utils/exceptions/business.error";

import { type TState } from "../types/TState";

const useInputUsername = () => {
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";
  const [error, setError] = useState();

  const submitUsername = async (
    formData: { username: string },
    changeState: (state: TState) => void
  ) => {
    try {
      if (!email) throw BusinessError.InvalidInput("Отсутствует E-Mail.");

      console.log({ formData });

      const result = await axios.post(
        `${AppEnv.NEXT_PUBLIC_API_BASE_URL}/sign_up_with_email`,
        {
          username: formData.username,
          email
        },
        { headers: { "Content-Type": "application/json" }, withCredentials: true }
      );
    } catch (error: any) {
      setError(error.message);
      changeState("callback");
    }
  };

  return { error, submitUsername };
};

export { useInputUsername };
