"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import clsx from "clsx";

import { FormInput } from "@ui/Input";
import { ButtonWithLoading } from "@ui/Button";
import { Text } from "@ui/Text";
import { type TContentProps } from "@modules/Auth/types/TContentProps";
import { useInputUsername } from "@modules/Auth/vm/useInputUsername";
import { UsernameFromSchema, type TUsernameFrom } from "@modules/Auth/types/TUsernameForm";
import { Loader } from "@ui/Loader";

import st from "./AuthInputUsernameContent.module.scss";

function AuthInputUsernameContent(props: TContentProps) {
  const { changeState } = props;
  const { error, submitUsername } = useInputUsername();
  const {
    register,
    handleSubmit,
    clearErrors,
    formState: { errors, isSubmitting }
  } = useForm<TUsernameFrom>({
    delayError: 500,
    shouldFocusError: true,
    mode: "onChange",
    resetOptions: {
      keepErrors: false,
      keepDefaultValues: true
    },
    resolver: zodResolver(UsernameFromSchema)
  });

  return isSubmitting ? (
    <Loader loader={"spinner"} />
  ) : (
    <>
      <div className={st.header}>
        <Text as={"h3"} fontWeight={"Semibold"}>
          {"Укажите своё имя"}
        </Text>
        <Text as={"p"} fontSize={13} fontWeight={"Semibold"} className={st.info}>
          {"Его можно будет изменить в настройках профиля"}
        </Text>
      </div>
      <form
        className={clsx(st.usernameForm, errors.username?.message && st.invalidUsernameFrom)}
        onSubmit={handleSubmit((data) => submitUsername(data, changeState))}
      >
        <FormInput
          {...register("username", {
            onChange: () => {
              clearErrors("username");
            }
          })}
          id={"username"}
          type={"text"}
          placeholder={"Ваше имя / никнейм"}
          errorMessage={errors.username?.message}
          onBlur={(event) => {
            if (event.target.value === "") {
              clearErrors("username");
            }
          }}
        />
        <ButtonWithLoading kind={"primary"} size={"large"} loader={"spinner"} isLoading={false}>
          {"Подтвердить\r"}
        </ButtonWithLoading>
      </form>
    </>
  );
}

export default AuthInputUsernameContent;
