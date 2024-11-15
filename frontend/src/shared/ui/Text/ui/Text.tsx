import { clsx } from "clsx";

import st from "./Text.module.scss";

import type { ElementType } from "react";
import type { TTextProps } from "../types/TTextProps";

const defaultTag = "p";

function Text<E extends ElementType = typeof defaultTag>(props: TTextProps<E>) {
  const { as: Element = defaultTag, children, className, ...otherProps } = props;

  return (
    <Element className={clsx(st.text, className)} {...otherProps}>
      {children}
    </Element>
  );
}

export default Text;
