import clsx from "clsx";

import UnstyledButton from "@ui/Button/ui/UnstyledButton";

import { type TIconButtonProps } from "../types/TIconButtonProps";

import st from "./IconButton.module.scss";

function IconButton(props: TIconButtonProps) {
  const { kind, size, icon, ...otherProps } = props;

  return (
    <UnstyledButton<"button">
      as={"button"}
      className={clsx(st.iconButton, st[kind], st[size])}
      {...otherProps}
    >
      {icon}
    </UnstyledButton>
  );
}

export default IconButton;
