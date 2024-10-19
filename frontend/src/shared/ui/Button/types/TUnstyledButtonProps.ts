import type { ComponentPropsWithRef, ElementType } from "react";

type TUnstyledButtonOwnProps<E extends ElementType = ElementType> = {
  as?: E;
};

type TUnstyledButtonProps<E extends ElementType> = TUnstyledButtonOwnProps<E> &
  Omit<ComponentPropsWithRef<E>, keyof TUnstyledButtonOwnProps<E>>;

export { type TUnstyledButtonProps };
