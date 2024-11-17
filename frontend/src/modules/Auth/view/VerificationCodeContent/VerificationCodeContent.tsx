"use client";

import { Button, ButtonWithLoading } from "@ui/Button";
import { InputVerificationCode } from "@ui/Input";
import { Text } from "@ui/Text";
import { ArrowIcon } from "@icons/ArrowIcon";
import { EmailIcon } from "@icons/EmailIcon";
import { useVerificationCodeContent } from "@modules/Auth/vm/hooks/useVerificationCodeContent";
import { useTranslations } from "next-intl";
import { Separator } from "@ui/Separator";

import st from "./VerificationCodeContent.module.scss";

function VerificationCodeContent() {
  const {
    timeView,
    modalDisabled,
    timer,
    email,
    emailProvider,
    verificationCodeError,
    checkVerificationCodeProcess,
    requestCodeProcess,
    resendCodeDisabled,
    onVerificationCodeChanged,
    onResendCode,
    onModalToAuthorizationMethod,
    verifyInputRef,
    onVerificationCodeSubmitted
  } = useVerificationCodeContent();
  const t = useTranslations("auth.verificationCodeContent");

  return (
    <>
      <div className={st.header}>
        <div className={st.textBlock}>
          <Text<"h1"> as={"h1"}>{t("title")}</Text>
          <Text<"p"> as={"p"} className={st.hint}>
            {t("hint")}
          </Text>
        </div>
        <div className={st.emailBlock}>
          {emailProvider ? (
            <Button<"a">
              as={"a"}
              href={emailProvider.redirectURL}
              target={"_blank"}
              rel={"noopener noreferrer"}
              kind={"link"}
              size={"small"}
              iconLeft={<EmailIcon type={emailProvider.name} />}
            >
              {email}
            </Button>
          ) : (
            <div>
              <Text<"span"> as={"span"}>{email}</Text>
            </div>
          )}
        </div>
      </div>
      <div className={st.verifyBlock}>
        <InputVerificationCode
          ref={verifyInputRef}
          length={5}
          placeholder={""}
          isBeingChecked={checkVerificationCodeProcess}
          errorMessage={verificationCodeError}
          onCompleted={onVerificationCodeSubmitted}
          onChange={onVerificationCodeChanged}
          inputSlotProps={{ disabled: modalDisabled }}
        />
        <ButtonWithLoading
          as={"button"}
          kind={"label"}
          size={"small"}
          disabled={modalDisabled || resendCodeDisabled}
          onClick={onResendCode}
          isLoading={requestCodeProcess}
        >
          {t("verificationCode.buttonResendCode")}
          {timer
            ? timeView.minutes !== 0
              ? ` ${timeView.minutes}:${timeView.seconds < 10 ? `0${timeView.seconds}` : timeView.seconds} ${t("verificationCode.time.minutes")}`
              : ` ${timeView.seconds < 10 ? `0${timeView.seconds}` : timeView.seconds} ${t("verificationCode.time.minutes")}`
            : null}
        </ButtonWithLoading>
      </div>
      <Separator orientation={"horizontal"} />
      <Button
        as={"button"}
        kind={"label"}
        size={"large"}
        iconLeft={<ArrowIcon />}
        className={st.backButton}
        onClick={onModalToAuthorizationMethod}
        disabled={modalDisabled}
      >
        {t("buttonAnotherWayToLogIn")}
      </Button>
    </>
  );
}

export default VerificationCodeContent;
