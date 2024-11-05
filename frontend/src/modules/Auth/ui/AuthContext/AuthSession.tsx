"use client";

import { createContext, useEffect, useState } from "react";

import { ENV } from "@env/app.env";
import { api } from "@utils/api.utils";

import type { Dispatch, ReactNode } from "react";

export const AuthContext = createContext<{ session: any | null; setSession: Dispatch<any> }>({
  session: {},
  setSession: () => {}
});

function AuthSession(props: { children: ReactNode }) {
  const { children } = props;
  const [session, setSession] = useState<any>(null);

  useEffect(() => {
    // const auth = async () => {
    //   try {
    //     const result = await api.get(ENV.NEXT_PUBLIC_API_BASE_URL + ":80/api/auth", {
    //       withCredentials: true
    //     });
    //     if (result.data) setSession(result.data);
    //   } catch {
    //     console.log("Unauthorize");
    //   }
    // };
    // auth();
  }, []);

  return <AuthContext.Provider value={{ session, setSession }}>{children}</AuthContext.Provider>;
}

export default AuthSession;
