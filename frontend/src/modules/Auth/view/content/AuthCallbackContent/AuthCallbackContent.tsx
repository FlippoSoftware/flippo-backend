"use client";

import { useContext, useEffect } from "react";
import { useRouter } from "next/navigation";

import { AuthContext } from "@modules/Auth/ui/AuthContext/AuthSession";
import { Text } from "@ui/Text";
import { AuthSchema } from "@modules/Auth/store/auth.schema";
import { CheckIcon } from "@icons/CheckIcon";
import { Button } from "@ui/Button";
import { ErrorIcon } from "@icons/ErrorIcon";

import { useParsSearchParams } from "./useParsSearchParams";
import st from "./AuthCallbackContent.module.scss";

import type { TContentProps } from "../../../types/TContentProps";

function AuthCallbackContent(props: TContentProps) {
  const { changeState } = props;
  const router = useRouter();
  const { setSession } = useContext(AuthContext);
  const { ok, data } = useParsSearchParams(AuthSchema);

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
          <CheckIcon width={100} height={100} type={"circleFilled"} />
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
          <ErrorIcon width={100} height={100} />
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

export default AuthCallbackContent;
