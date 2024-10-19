"use client";

import axios from "axios";
import { usePathname, useRouter } from "next/navigation";
import { useContext } from "react";

import { AppEnv } from "@env/app.env";
import { AuthContext } from "@modules/Auth";
import { Button } from "@ui/Button";

function Home() {
  const { session, setSession } = useContext(AuthContext);
  const router = useRouter();
  const pathname = usePathname();

  return (
    <main>
      {session ? (
        <h1>
          {"Hello, "}
          {session.name}
          {"!"}
        </h1>
      ) : (
        <h1>{"Welcome to Flippo!"}</h1>
      )}

      {session ? (
        <Button
          kind={"outlined"}
          size={"large"}
          onClick={async () => {
            try {
              await axios.post(
                AppEnv.NEXT_PUBLIC_API_BASE_URL + "/auth/refresh_token/signout",
                {},
                {
                  withCredentials: true
                }
              );
            } catch (error: any) {
              console.error(error.message);
            } finally {
              setSession(null);
            }
          }}
        >
          {"SignOut"}
        </Button>
      ) : (
        <Button
          kind={"primary"}
          size={"large"}
          onClick={() => router.push(`/auth?urlCallback=${pathname}`)}
        >
          {"SignIn & SignUp"}
        </Button>
      )}

      <Button
        kind={"primary"}
        size={"large"}
        onClick={async () => {
          const response = await axios.get(
            AppEnv.NEXT_PUBLIC_API_BASE_URL + "/auth/refresh_token/refresh",
            {
              withCredentials: true
            }
          );
        }}
      >
        {"Refresh\r"}
      </Button>
    </main>
  );
}

export default Home;
