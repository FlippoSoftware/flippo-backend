import type { ComponentProps, ElementType } from "react";

enum FontWeight {
  ExtraLight = 200,
  Light = 300,
  Regular = 400,
  Medium = 500,
  Semibold = 600,
  Bold = 700,
  ExtraBold = 800
}

type TTextOwnProps<E extends ElementType = ElementType> = {
  fontSize?: number | string | `${number}px` | `${number}rem` | `${number}em` | `${number}%`;
  fontWeight?: keyof typeof FontWeight | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;
  lineHeight?: number | string | `${number}px` | `${number}rem` | `${number}em` | `${number}%`;
  color?:
    | "transparent"
    | "currentColor"
    | "unset"
    | `--${string})`
    | [number, number, number, number]
    | string;
  as?: E;
};

type TTextProps<E extends ElementType> = TTextOwnProps<E> &
  Omit<ComponentProps<E>, keyof TTextOwnProps>;

export { FontWeight, type TTextProps };
