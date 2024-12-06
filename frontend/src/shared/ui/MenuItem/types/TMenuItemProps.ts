import { type AriaRole, type ComponentProps, type ReactElement } from 'react';

type TRole = Extract<AriaRole, 'menuitem' | 'option'>;

type TMenuItemOwnProps<E extends TRole> = {
  icon: ReactElement;
  onClick: (value: string) => void;
  role: E;
  title: string;
  value: string;
  variant?: 'destructive' | 'nonDestructive';
};

type TOption = {
  isSelected: boolean;
  variant?: 'nonDestructive';
};

type TMenuItemProps<E extends TRole = 'option'> = E extends 'menuitem'
  ? Omit<ComponentProps<'button'>, keyof TMenuItemOwnProps<E>> & TMenuItemOwnProps<E>
  : Omit<ComponentProps<'button'>, keyof TMenuItemOwnProps<E>> & TMenuItemOwnProps<E> & TOption;

export type { TMenuItemProps };
