"use client";

import clsx from "clsx";
import { FormInput } from "@ui/Input";
import { ButtonWithLoading } from "@ui/Button";
import { Text } from "@ui/Text";
import { useInputUsername } from "@modules/Auth/vm/useInputUsername";
import { Loader } from "@ui/Loader";
import { useTranslations } from "next-intl";

import st from "./InputUsernameContent.module.scss";

function InputUsernameContent() {
  const {
    usernameInput,
    usernameInputError,
    userRegistration,
    usernameInputRef,
    modalAuthDisabled,
    onUsernameInputChanged,
    onUsernameSubmitted
  } = useInputUsername();
  const t = useTranslations("auth.inputUsernameContent");

  return userRegistration ? (
    <Loader loader={"spinner"} />
  ) : (
    <>
      <div className={st.header}>
        <Text as={"h3"} fontWeight={"Semibold"}>
          {t("title")}
        </Text>
        <Text as={"p"} fontSize={13} fontWeight={"Semibold"} className={st.info}>
          {t("hint")}
        </Text>
      </div>
      <form
        className={clsx(st.usernameForm, usernameInputError && st.invalidUsernameFrom)}
        onSubmit={(event) => {
          event.preventDefault();
          onUsernameSubmitted();
        }}
      >
        <FormInput
          ref={usernameInputRef}
          name={"username"}
          id={"username"}
          type={"text"}
          placeholder={t("inputPlaceholder")}
          value={usernameInput}
          errorMessage={usernameInputError ? t(`inputError.${usernameInputError}` as any) : null}
          disabled={modalAuthDisabled}
          onChange={(event) => onUsernameInputChanged(event.target.value)}
        />
        <ButtonWithLoading kind={"primary"} size={"large"} loader={"spinner"} isLoading={false}>
          {t("buttonSubmit")}
        </ButtonWithLoading>
      </form>
    </>
  );
}

export default InputUsernameContent;
