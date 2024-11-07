"use client";

import { useContext, useEffect } from "react";
import { useRouter } from "@i18n/routing";
import { AuthContext } from "@modules/Auth/ui/AuthContext/AuthSession";
import { Text } from "@ui/Text";
import { SuccessIcon } from "@icons/SuccessIcon";
import { Button } from "@ui/Button";
import { ErrorIcon } from "@icons/ErrorIcon";
import { SessionSchema } from "@shared/stores/session.store";

import { useParsSearchParams } from "./useParsSearchParams";
import st from "./OauthCallbackContent.module.scss";

function OauthCallbackContent() {
  const router = useRouter();
  const { setSession } = useContext(AuthContext);
  const { ok, data } = useParsSearchParams(SessionSchema);

  useEffect(() => {
    const redirectURL = localStorage.getItem("urlCallback");
    if (ok) {
      setSession({ ...data });
      const timer = setTimeout(() => router.replace(redirectURL ? redirectURL : "/"), 1000);
      return () => {
        clearTimeout(timer);
        localStorage.removeItem("urlCallback");
      };
    }
    return () => {
      if (redirectURL) localStorage.removeItem("urlCallback");
    };
  }, [ok, data, router, setSession]);

  if (ok) {
    return (
      <div className={st.content}>
        <div className={st.icon}>
          <SuccessIcon width={100} height={100} type={"circleFilled"} />
        </div>
        <Text<"h1"> as={"h1"}>
          {"Welcome to "}
          <span className={st.flippo}>{"Flippo"}</span>
          {"!\r"}
        </Text>
      </div>
    );
  }

  return (
    <>
      <Text<"h1"> as={"h1"}>{"Auth status"}</Text>
      <div className={st.content}>
        <div className={st.error}>
          <ErrorIcon type={"circleFilled"} width={100} height={100} />
          <Text<"h3"> as={"h3"}>{`ERROR: ${data.error}`}</Text>
        </div>
        <div className={st.button_container}>
          <Button kind={"primary"} size={"large"} onClick={() => router.replace("/auth")}>
            {"Try again\r"}
          </Button>
          <Button
            kind={"outlined"}
            size={"large"}
            onClick={() => {
              const redirectURL = localStorage.getItem("urlCallback");
              router.replace(redirectURL ? redirectURL : "/");
            }}
          >
            {"Go back\r"}
          </Button>
        </div>
      </div>
    </>
  );
}

export default OauthCallbackContent;
