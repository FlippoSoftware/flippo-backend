import { type ComponentProps, type ReactElement } from 'react';

type TItem = {
  disabled?: boolean;
  icon: ReactElement;
  onClick?: () => void;
  title: string;
  variant?: 'destructive' | 'nonDestructive';
};

type TItemProps = Omit<ComponentProps<'div'>, keyof TItem> & TItem;

export type { TItem, TItemProps };
