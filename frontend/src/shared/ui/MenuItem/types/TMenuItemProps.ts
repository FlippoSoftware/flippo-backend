import { type ComponentProps, type ReactElement } from 'react';

type TMenuItem = {
  icon: ReactElement;
  onClick: () => void;
  title: string;
  variant?: 'destructive' | 'nonDestructive';
};

type TMenuItemProps = Omit<ComponentProps<'button'>, keyof TMenuItem> & TMenuItem;

export type { TMenuItem, TMenuItemProps };
