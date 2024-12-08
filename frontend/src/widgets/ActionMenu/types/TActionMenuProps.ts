import { type TMenuItemProps } from '@shared/ui/OptionItem';
import { type MenuHTMLAttributes } from 'react';

type TMenu = {
  groups: TMenuItemProps[][];
  id?: `action-menu-${string}`;
  onClose: () => void;
  targetRec?: {
    bottom: number;
    left: number;
    right: number;
    top: number;
  };
};

type TActionMenuProps = Omit<MenuHTMLAttributes<HTMLMenuElement>, keyof TMenu> & TMenu;

export type { TActionMenuProps, TMenu };
