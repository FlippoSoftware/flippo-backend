import { type Dispatch, type ReactNode, type RefObject, type SetStateAction } from 'react';

type TPlacement =
  | 'bottom'
  | 'bottom-end'
  | 'bottom-start'
  | 'left'
  | 'left-end'
  | 'left-start'
  | 'right'
  | 'right-end'
  | 'right-start'
  | 'top'
  | 'top-end'
  | 'top-start';

type TOffset = number;

type TAnimation = {
  animateSize?: number;
  duration?: number;
  exitSize?: number;
  initialSize?: number;
};

type TMenuContextValue = {
  activeIndex?: number;
  animation?: TAnimation;
  handler: RefObject<HTMLElement>;
  isOpen: boolean;
  menu: RefObject<HTMLMenuElement>;
  offset: TOffset;
  onClose: () => void;
  onToggle: () => void;
  placement: TPlacement;
  setActiveIndex: Dispatch<SetStateAction<number>>;
  x: number;
  y: number;
};

type TMenuContextProviderProps = {
  children: ReactNode;
  value: TMenuContextValue;
};

export type { TAnimation, TMenuContextProviderProps, TMenuContextValue, TOffset, TPlacement };
