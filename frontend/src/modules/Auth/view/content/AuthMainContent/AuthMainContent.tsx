"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { clsx } from "clsx";

import { Text } from "@ui/Text";
import { authProviders, type TAuthProvider } from "@utils/query/getOAuthUrl.utils";
import { FormInput } from "@ui/Input";
import { ButtonWithLoading } from "@ui/Button";
import { EmailFormSchema } from "@modules/Auth/types/TEmailForm";
import { Loader } from "@ui/Loader";

import { useAuth } from "../../../vm/useAuth";
import OAuthButton from "../../../ui/OAuthButton/ui/OAuthButton";

import st from "./AuthMainContent.module.scss";

import type { TContentProps } from "../../../types/TContentProps";
import type { TEmailForm } from "@modules/Auth/types/TEmailForm";

function AuthMainContent(props: TContentProps) {
  const { changeState } = props;
  const { error, emailDefaultValue, router, isRedirecting, redirectToOAuthProvider, submitEmail } =
    useAuth();
  const {
    register,
    handleSubmit,
    clearErrors,
    getValues,
    formState: { errors, isSubmitting }
  } = useForm<TEmailForm>({
    delayError: 1000,
    shouldFocusError: true,
    mode: "onChange",
    resetOptions: {
      keepErrors: false,
      keepDefaultValues: true
    },
    resolver: zodResolver(EmailFormSchema),
    defaultValues: {
      email: emailDefaultValue
    }
  });

  return (
    <>
      <div className={st.header}>
        <Text<"h1"> as={"h1"} fontSize={29}>
          {"Приветствуем в "}
          <span className={st.flippo}>{"Flippo"}</span>
          {"!\r"}
        </Text>
        <div className={clsx(st.status, (!!error || isRedirecting) && st.showStatus)}>
          {error ? (
            <Text<"p"> as={"p"} color={"var(--feedback-notification)"}>
              {error}
            </Text>
          ) : isRedirecting ? (
            <Loader loader={"spinner"} className={st.loader} />
          ) : null}
        </div>
      </div>

      <div className={st.buttonContainer}>
        {authProviders.map((provider: TAuthProvider) => (
          <OAuthButton
            key={provider}
            provider={provider}
            onClick={() => redirectToOAuthProvider(provider)}
          />
        ))}
      </div>
      <div className={st.separator}>
        <hr className={st.line} />
        <Text as={"span"} fontSize={13}>
          {"или\r"}
        </Text>
        <hr className={st.line} />
      </div>
      <form
        className={clsx(st.emailForm, { [st.invalidEmailForm]: !!errors.email?.message })}
        onSubmit={handleSubmit((data: TEmailForm) => submitEmail(data, changeState))}
      >
        <FormInput
          {...register("email", {
            onChange: () => {
              clearErrors("email");

              const newUrl = new URL(window.location.href);
              newUrl.searchParams.set("email", getValues("email"));

              router.replace(newUrl.toString(), { scroll: false });
            }
          })}
          onBlur={(event) => {
            if (event.target.value === "") {
              clearErrors("email");
            }
            return;
          }}
          id={"email"}
          placeholder={"Введите свой E-Mail"}
          type={"email"}
          errorMessage={errors.email?.message}
        />
        <ButtonWithLoading kind={"primary"} size={"large"} isLoading={isSubmitting}>
          {"Войти по почте"}
        </ButtonWithLoading>
      </form>
    </>
  );
}

export default AuthMainContent;
