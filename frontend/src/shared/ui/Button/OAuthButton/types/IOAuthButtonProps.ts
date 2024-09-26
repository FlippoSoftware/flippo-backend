import { ButtonHTMLAttributes } from "react";

interface IOAuthButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  provider: "Google" | "Vkontakte";
}

export { type IOAuthButtonProps };
