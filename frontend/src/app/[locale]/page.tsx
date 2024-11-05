"use client";

import axios from "axios";
import { useContext } from "react";
import { useUnit } from "effector-react";
import { useTranslations } from "next-intl";
import { ENV } from "@env/app.env";
import { AuthContext, modalAuthOpen } from "@modules/Auth";
import { Button } from "@ui/Button";

function Home() {
  const { session, setSession } = useContext(AuthContext);
  const onModalAuthOpen = useUnit(modalAuthOpen);
  const t = useTranslations("RootLayout");

  return (
    <main>
      {session ? (
        <h1>
          {"Hello, "}
          {session.name}
          {"!"}
        </h1>
      ) : (
        <h1>{t("title")}</h1>
      )}

      {session ? (
        <Button
          kind={"outlined"}
          size={"large"}
          onClick={async () => {
            try {
              await axios.post(
                ENV.API_BASE_URL + "/auth/refresh_token/signout",
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
        <Button kind={"primary"} size={"large"} onClick={onModalAuthOpen}>
          {"SignIn & SignUp"}
        </Button>
      )}

      <Button
        kind={"primary"}
        size={"large"}
        onClick={async () => {
          await axios.get(ENV.API_BASE_URL + "/auth/refresh_token/refresh", {
            withCredentials: true
          });
        }}
      >
        {"Refresh\r"}
      </Button>
    </main>
  );
}

export default Home;
