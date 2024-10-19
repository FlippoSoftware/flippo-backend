import { clsx } from "clsx";

import { FontWeight } from "../types/TTextProps";

import st from "./Text.module.scss";

import type { ElementType } from "react";
import type { TTextProps } from "../types/TTextProps";

const defaultTag = "p";

function Text<E extends ElementType = typeof defaultTag>(props: TTextProps<E>) {
  const {
    as: Element = defaultTag,
    children,
    fontSize,
    fontWeight,
    lineHeight = "150%",
    color,
    className,
    ...otherProps
  } = props;

  const style = {
    fontSize: typeof fontSize === "number" ? `${fontSize}px` : fontSize,
    fontWeight: typeof fontWeight === "string" ? FontWeight[fontWeight] : fontWeight,
    lineHeight: typeof lineHeight === "number" ? `${lineHeight}px` : lineHeight,
    color: Array.isArray(color)
      ? `rgba(${color.join(", ").toString()})`
      : color?.startsWith("--")
        ? `var(${color})`
        : color
  };

  return (
    <Element style={style} className={clsx(st.text, className)} {...otherProps}>
      {children}
    </Element>
  );
}

export default Text;
