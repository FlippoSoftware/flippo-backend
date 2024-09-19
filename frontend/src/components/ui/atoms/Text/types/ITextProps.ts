import { HTMLAttributes } from "react";

enum FontWeight {
  ExtraLight = 200,
  Light = 300,
  Regular = 400,
  Medium = 500,
  Semibold = 600,
  Bold = 700,
  ExtraBold = 800
}

interface ITextProps
  extends Omit<
    HTMLAttributes<HTMLParagraphElement | HTMLSpanElement | HTMLHeadingElement>,
    "children"
  > {
  children: string | number | Date | Symbol;
  fontSize?: number | string | `${number}px` | `${number}rem` | `${number}em` | `${number}%`;
  fontWeight?: keyof typeof FontWeight | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;
  lineHeight?: number | string | `${number}px` | `${number}rem` | `${number}em` | `${number}%`;
  as?: keyof Pick<JSX.IntrinsicElements, "p" | "span" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6">;
}

export { FontWeight, type ITextProps };
