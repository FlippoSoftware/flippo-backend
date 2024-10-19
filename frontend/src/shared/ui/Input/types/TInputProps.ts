import type { ComponentPropsWithRef, ElementType } from "react";

type TUnstyledInputOwnProps<E extends ElementType = ElementType> = {
  as?: E;
};

type TUnstyledInputProps<E extends ElementType> = TUnstyledInputOwnProps<E> &
  Omit<ComponentPropsWithRef<E>, keyof TUnstyledInputOwnProps>;

export { type TUnstyledInputProps };
