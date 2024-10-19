import type { ElementType } from "react";
import type { TUnstyledInputProps } from "../types/TInputProps";

const defaultTag = "input";

function UnstyledInput<E extends ElementType = typeof defaultTag>(props: TUnstyledInputProps<E>) {
  const { as: Element = defaultTag, ...otherProps } = props;

  return <Element {...otherProps} />;
}

export default UnstyledInput;
