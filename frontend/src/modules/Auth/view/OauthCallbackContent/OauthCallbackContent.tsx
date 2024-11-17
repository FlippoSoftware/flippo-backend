"use client";

import { useEffect } from "react";
import { useRouter } from "@i18n/routing";
import { Text } from "@ui/Text";
import { SuccessIcon } from "@icons/SuccessIcon";
import { Button } from "@ui/Button";
import { ErrorIcon } from "@icons/ErrorIcon";
import { SessionSchema } from "@shared/models/session.store";
import { useTranslations } from "next-intl";
import { ArrowIcon } from "@icons/ArrowIcon";

import { useParsSearchParams } from "./useParsSearchParams";
import st from "./OauthCallbackContent.module.scss";

function OauthCallbackContent() {
  const router = useRouter();
  const { ok, data } = useParsSearchParams(SessionSchema);
  const t = useTranslations("auth.oauthCallbackContent");

  useEffect(() => {
    const redirectURL = localStorage.getItem("urlCallback");
    if (ok) {
      const timer = setTimeout(() => router.replace(redirectURL ? redirectURL : "/"), 1000);
      return () => {
        clearTimeout(timer);
        localStorage.removeItem("urlCallback");
      };
    }
    return () => {
      if (redirectURL) localStorage.removeItem("urlCallback");
    };
  }, [ok, data, router]);

  if (ok) {
    return (
      <div className={st.success}>
        <SuccessIcon type={"circle"} />
        <Text<"h1"> as={"h1"}>{t("done.title")}</Text>
        <Text<"p"> as={"p"} className={st.hint}>
          {t("done.hint")}
        </Text>
      </div>
    );
  }

  return (
    <>
      <div className={st.error}>
        <ErrorIcon type={"circle"} />
        <div>
          <Text<"h1"> as={"h1"}>{t("fail.title")}</Text>
          <Text<"p"> as={"p"} className={st.errorMessage}>{`ERROR: ${data.error}`}</Text>
        </div>
      </div>
      <div className={st.buttonContainer}>
        <Button kind={"primary"} size={"large"} onClick={() => router.replace("/auth")}>
          {t("fail.buttonAgain")}
        </Button>
        <Button
          kind={"secondary"}
          size={"large"}
          iconLeft={<ArrowIcon />}
          onClick={() => {
            const redirectURL = localStorage.getItem("urlCallback");
            router.replace(redirectURL ? redirectURL : "/");
          }}
        >
          {t("fail.buttonBack")}
        </Button>
      </div>
    </>
  );
}

export default OauthCallbackContent;
