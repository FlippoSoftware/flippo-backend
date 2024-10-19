import type { ElementType } from "react";
import type { TUnstyledButtonProps } from "../types/TUnstyledButtonProps";

const defaultTag = "button";

function UnstyledButton<E extends ElementType = typeof defaultTag>(props: TUnstyledButtonProps<E>) {
  const { children, as: Element = defaultTag, ...otherProps } = props;

  return <Element {...otherProps}>{children}</Element>;
}

export default UnstyledButton;
