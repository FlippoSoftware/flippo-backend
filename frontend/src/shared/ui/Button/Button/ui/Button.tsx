import { clsx } from "clsx";

import { UnstyledButton } from "@ui/Button";
import Text from "@ui/Text/ui/Text";
import { ArrowIcon } from "@icons/ArrowIcon";

import st from "./Button.module.scss";

import type { TButtonProps } from "../types/TButtonProps";

function Button<E extends "button" | "a">(props: TButtonProps<E>) {
  const { kind, size, iconLeft, iconRight, children, className, ...otherProps } = props;

  return (
    <UnstyledButton className={clsx(st.button, st[kind], st[size], className)} {...otherProps}>
      <div className={st.content}>
        {iconLeft}
        <Text<"span"> as={"span"} fontWeight={"Semibold"} lineHeight={"150%"}>
          {children}
        </Text>
        {kind === "link" ? <ArrowIcon type={"link"} /> : iconRight}
      </div>
    </UnstyledButton>
  );
}

export default Button;
