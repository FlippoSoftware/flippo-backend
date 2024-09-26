import { ITextProps, FontWeight } from "../types/ITextProps";

import st from "./Text.module.scss";
import { cn } from "@shared/utils/cn.utils";

const Text = (props: ITextProps) => {
  const {
    as: Element = "p",
    children,
    fontSize,
    fontWeight,
    lineHeight,
    className,
    ...otherProps
  } = props;

  const style = {
    fontSize: typeof fontSize === "number" ? `${fontSize}px` : fontSize,
    fontWeight:
      typeof fontWeight === "number" ? `${fontWeight}px` : fontWeight && FontWeight[fontWeight],
    lineHeight: typeof lineHeight === "number" ? `${lineHeight}px` : lineHeight
  } as Pick<ITextProps, "fontSize" | "fontWeight" | "lineHeight">;

  return (
    <Element style={style} className={cn(st.text, className)} {...otherProps}>
      {String(children)}
    </Element>
  );
};

export { Text };
