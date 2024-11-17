"use client";

import { clsx } from "clsx";
import { Text } from "@ui/Text";
import { authProviders, type TAuthProvider } from "@shared/query/getOAuthUrl.utils";
import { FormInput } from "@ui/Input";
import { ButtonWithLoading } from "@ui/Button";
import { Loader } from "@ui/Loader";
import { useTranslations } from "next-intl";
import { Separator } from "@ui/Separator";

import { useAuthorizationMethodContent } from "../../vm/hooks/useAuthorizationMethodContent";
import OAuthButton from "../../ui/OAuthButton/ui/OAuthButton";

import st from "./AuthorizationMethodContent.module.scss";

function AuthorizationMethodContent() {
  const {
    emailInput,
    emailInputError,
    emailInputRef,
    modalDisabled,
    redirectPending,
    emailPending,
    onEmailInputBlur,
    onEmailInputChanged,
    onEmailSubmitted,
    onOauthRedirect
  } = useAuthorizationMethodContent();
  const t = useTranslations("auth.authorizationMethodContent");

  return (
    <>
      <div className={st.header}>
        <Text<"h1"> as={"h1"}>
          {t.rich("title", {
            span: (chunks) => <span className={st.flippo}>{chunks}</span>
          })}
        </Text>
        <div className={clsx(st.status, redirectPending && st.showStatus)}>
          <Loader loader={"spinner"} className={st.loader} />
        </div>
      </div>

      <div className={st.buttonContainer}>
        {authProviders.map((provider: TAuthProvider) => (
          <OAuthButton
            key={provider}
            provider={provider}
            onClick={() => onOauthRedirect(provider)}
            disabled={modalDisabled}
          >
            {t(`oauth.buttonOauth.${provider}` as any)}
          </OAuthButton>
        ))}
      </div>
      <div className={st.separator}>
        <Separator orientation={"horizontal"} />
        <Text as={"span"}>{t("separator")}</Text>
        <Separator orientation={"horizontal"} />
      </div>
      <form
        className={clsx(st.emailForm, { [st.invalidEmailForm]: !!emailInputError })}
        onSubmit={(event) => {
          event.preventDefault();
          onEmailSubmitted();
        }}
      >
        <FormInput
          ref={emailInputRef}
          name={"email"}
          id={"email"}
          placeholder={t("email.inputPlaceholder")}
          type={"text"}
          value={emailInput}
          onChange={(event) => onEmailInputChanged(event.target.value)}
          onBlur={onEmailInputBlur}
          errorMessage={emailInputError ? t(`email.inputError.${emailInputError}` as any) : null}
          disabled={modalDisabled}
        />
        <ButtonWithLoading
          kind={"primary"}
          size={"large"}
          isLoading={emailPending}
          disabled={modalDisabled}
        >
          {t("email.buttonSubmit")}
        </ButtonWithLoading>
      </form>
    </>
  );
}

export default AuthorizationMethodContent;
