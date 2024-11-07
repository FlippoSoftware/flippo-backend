import { clsx } from "clsx";
import { UnstyledButton } from "@ui/Button";
import { Text } from "@ui/Text";

import { PROVIDER_ICONS } from "../../../constant";

import st from "./OAuthButton.module.scss";

import type { TOAuthButtonProps } from "../types/TOAuthButtonProps";

function OAuthButton(props: TOAuthButtonProps) {
  const { provider, children, ...otherProps } = props;

  return (
    <UnstyledButton className={clsx(st.button, st[provider])} {...otherProps}>
      <div className={st.content}>
        <div className={st.icon}>{PROVIDER_ICONS[provider]}</div>
        <Text<"span"> as={"span"} fontSize={16} fontWeight={"Bold"}>
          {children}
        </Text>
      </div>
    </UnstyledButton>
  );
}

export default OAuthButton;
