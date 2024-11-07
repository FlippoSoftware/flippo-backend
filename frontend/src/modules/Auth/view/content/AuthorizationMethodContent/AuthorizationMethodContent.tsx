"use client";

import { clsx } from "clsx";
import { Text } from "@ui/Text";
import { authProviders, type TAuthProvider } from "@utils/query/getOAuthUrl.utils";
import { FormInput } from "@ui/Input";
import { ButtonWithLoading } from "@ui/Button";
import { Loader } from "@ui/Loader";
import { useTranslations } from "next-intl";

import { useAuthorizationMethodContent } from "../../../vm/useAuthorizationMethodContent";
import OAuthButton from "../../../ui/OAuthButton/ui/OAuthButton";

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
        <Text<"h1"> as={"h1"} fontSize={29}>
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
        <hr className={st.line} />
        <Text as={"span"} fontSize={13}>
          {t("separator")}
        </Text>
        <hr className={st.line} />
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
