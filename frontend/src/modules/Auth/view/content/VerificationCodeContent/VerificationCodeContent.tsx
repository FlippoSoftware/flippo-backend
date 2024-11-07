"use client";

import { Button, ButtonWithLoading } from "@ui/Button";
import { InputVerificationCode } from "@ui/Input";
import { Text } from "@ui/Text";
import { ArrowIcon } from "@icons/ArrowIcon";
import { EmailIcon } from "@icons/EmailIcon";
import { useVerificationCodeContent } from "@modules/Auth/vm/useVerificationCodeContent";
import { useTranslations } from "next-intl";

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
          <Text<"h1"> as={"h1"} fontSize={29} fontWeight={"Semibold"}>
            {t("title")}
          </Text>
          <Text<"p"> as={"p"} fontSize={13} fontWeight={"ExtraBold"} color={"var(--neutral-50)"}>
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
              <Text<"span"> as={"span"} fontSize={14} fontWeight={"Semibold"}>
                {email}
              </Text>
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
          disabled={modalDisabled || !!timer}
          onClick={onResendCode}
          isLoading={modalDisabled}
        >
          {t("verificationCode.buttonResendCode")}
          {timer
            ? timeView.minutes !== 0
              ? ` ${timeView.minutes}:${timeView.seconds < 10 ? `0${timeView.seconds}` : timeView.seconds} ${t("verificationCode.time.minutes")}`
              : ` ${timeView.seconds < 10 ? `0${timeView.seconds}` : timeView.seconds} ${t("verificationCode.time.minutes")}`
            : null}
        </ButtonWithLoading>
      </div>
      <hr className={st.separator} />
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
