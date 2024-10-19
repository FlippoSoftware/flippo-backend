import type { ReactElement } from "react";
import type { TUnstyledButtonProps } from "@ui/Button/types/TUnstyledButtonProps";

type TButtonProps<E extends "button" | "a"> = {
  kind: "primary" | "secondary" | "outlined" | "label" | "link";
  size: "large" | "small";
  iconLeft?: ReactElement;
  iconRight?: ReactElement;
} & TUnstyledButtonProps<E>;

export { type TButtonProps };
