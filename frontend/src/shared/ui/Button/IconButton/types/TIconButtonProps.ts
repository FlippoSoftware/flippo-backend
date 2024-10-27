import { type ReactElement } from "react";

import { type TUnstyledButtonProps } from "@ui/Button/types/TUnstyledButtonProps";

type TIconButtonProps = {
  kind: "primary" | "secondary" | "outlined" | "label";
  size: "x-small" | "small" | "medium" | "large";
  icon: ReactElement<HTMLOrSVGElement>;
} & TUnstyledButtonProps<"button">;

export type { TIconButtonProps };
