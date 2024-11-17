import { type AnchorHTMLAttributes } from "react";

type TLinkProps = {
  variant: "neutral" | "brand";
  icon?: JSX.Element;
} & AnchorHTMLAttributes<HTMLAnchorElement>;

export { type TLinkProps };
