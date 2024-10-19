"use client";

import { Button, ButtonWithLoading } from "@ui/Button";
import { InputVerificationCode } from "@ui/Input";
import { Text } from "@ui/Text";
import { useVerifyCode } from "@modules/Auth/vm/useVerifyCode";
import { ArrowIcon } from "@icons/ArrowIcon";
import { EmailIcon } from "@icons/EmailIcon";

import st from "./AuthVerifyCodeContent.module.scss";

import type { TContentProps } from "../../../types/TContentProps";

function AuthVerifyCodeContent(props: TContentProps) {
  const {
    email,
    provider,
    isCheckingCode,
    isResending,
    timeLeft,
    verifyInputRef,
    reSendCode,
    codeValidation
  } = useVerifyCode();
  const { changeState } = props;

  const min = Math.floor(timeLeft / 60).toString();
  let sec = (timeLeft % 60).toString();
  if (Number(sec) < 10) {
    sec = `0${sec}`;
  }

  return (
    <>
      <div className={st.header}>
        <div className={st.textBlock}>
          <Text<"h1"> as={"h1"} fontSize={29} fontWeight={"Semibold"}>
            {"Вам письмо!\r"}
          </Text>
          <Text<"p"> as={"p"} fontSize={13} fontWeight={"ExtraBold"} color={"var(--neutral-50)"}>
            {"Введите код из письма, отправленного на указанный адрес:\r"}
          </Text>
        </div>
        <div className={st.emailBlock}>
          {provider ? (
            <Button<"a">
              as={"a"}
              href={provider.redirectURL}
              target={"_blank"}
              rel={"noopener noreferrer"}
              kind={"link"}
              size={"small"}
              iconLeft={<EmailIcon type={provider.name} />}
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
          onCompleted={(code: string) => {
            return codeValidation(code, changeState);
          }}
          inputSlotProps={{ disabled: isResending }}
        />
        <ButtonWithLoading
          as={"button"}
          kind={"label"}
          size={"small"}
          disabled={timeLeft !== 0}
          onClick={() => reSendCode()}
          isLoading={isResending}
        >
          {`Отправить код ещё раз.`}
          {timeLeft !== 0 && !isResending
            ? min !== "0"
              ? ` ${min}:${sec} мин`
              : ` ${sec} c`
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
        onClick={() => changeState("main")}
        disabled={isCheckingCode}
      >
        {"Другие способы входа\r"}
      </Button>
    </>
  );
}

export default AuthVerifyCodeContent;
