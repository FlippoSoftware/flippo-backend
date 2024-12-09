import { type TMenuItemProps } from '@shared/ui/MenuItem';
import { type MenuHTMLAttributes, type PropsWithChildren } from 'react';

type TMenu = PropsWithChildren<{
  groups: TMenuItemProps[][];
  id?: `action-menu-${string}`;
  locationOption?: {
    horizontal?: 'left' | 'right';
    vertical?: 'bottom' | 'top';
  };
  targetRec?: {
    bottom: number;
    left: number;
    right: number;
    top: number;
  };
}>;

type TActionMenuProps = Omit<MenuHTMLAttributes<HTMLMenuElement>, keyof TMenu> & TMenu;

export type { TActionMenuProps, TMenu };
