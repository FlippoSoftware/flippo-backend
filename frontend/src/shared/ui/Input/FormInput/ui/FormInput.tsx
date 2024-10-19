import { clsx } from "clsx";

import { UnstyledInput } from "@ui/Input";
import { Text } from "@ui/Text";

import st from "./FormInput.module.scss";

import type { TFormInputProps } from "../types/TFormInputProps";

function FormInput(props: TFormInputProps) {
  const {
    id,
    type,
    placeholder = "",
    showLabel = false,
    errorMessage,
    className,
    ...otherProps
  } = props;

  return (
    <div className={st.input_group}>
      <UnstyledInput
        as={"input"}
        id={id}
        type={type}
        placeholder={placeholder}
        className={clsx(st.input, errorMessage && st.invalid, className)}
        {...otherProps}
      />
      {showLabel ? (
        <label htmlFor={id} className={st.label}>
          {placeholder}
        </label>
      ) : null}
      <Text
        as={"p"}
        fontSize={13}
        fontWeight={"Semibold"}
        className={clsx(st.error, !!errorMessage && st.showError)}
      >
        {errorMessage}
      </Text>
    </div>
  );
}

export default FormInput;
