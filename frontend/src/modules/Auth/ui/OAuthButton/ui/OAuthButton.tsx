import { clsx } from "clsx";

import { UnstyledButton } from "@ui/Button";
import { Text } from "@ui/Text";

import { providerIcons, providerNames } from "../../../constant/OAuthButtonConst";

import st from "./OAuthButton.module.scss";

import type { TOAuthButtonProps } from "../types/TOAuthButtonProps";

function OAuthButton(props: TOAuthButtonProps) {
  const { provider, ...otherProps } = props;

  return (
    <UnstyledButton className={clsx(st.button, st[provider])} {...otherProps}>
      <div className={st.content}>
        <div className={st.icon}>{providerIcons[provider]}</div>
        <Text<"span"> as={"span"} fontSize={16} fontWeight={"Bold"}>{`Войти через ${
          providerNames[provider]
        }`}</Text>
      </div>
    </UnstyledButton>
  );
}

export default OAuthButton;
