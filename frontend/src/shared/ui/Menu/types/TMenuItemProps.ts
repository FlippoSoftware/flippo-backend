import { type ButtonHTMLAttributes, type ReactNode } from 'react';

type TMenuItemProps = {
  blockClose?: boolean;
  children: ReactNode;
  className?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export type { TMenuItemProps };
