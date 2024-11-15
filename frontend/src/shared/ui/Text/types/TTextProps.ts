import type { ComponentProps, ElementType } from "react";

type TTextOwnProps<E extends ElementType = ElementType> = {
  as?: E;
};

type TTextProps<E extends ElementType> = TTextOwnProps<E> &
  Omit<ComponentProps<E>, keyof TTextOwnProps>;

export { type TTextProps };
