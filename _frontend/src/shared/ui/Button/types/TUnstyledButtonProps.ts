import type { ComponentPropsWithRef, ElementType } from 'react';

type TUnstyledButtonOwnProps<E extends ElementType> = {
  as?: E;
};

type TUnstyledButtonProps<E extends ElementType> = Omit<ComponentPropsWithRef<E>, keyof TUnstyledButtonOwnProps<E>> &
  TUnstyledButtonOwnProps<E>;

export { type TUnstyledButtonProps };
