import { type Dispatch, type ReactNode, type RefObject, type SetStateAction } from 'react';

type TSelectContextValue = {
  activeIndex?: number;
  isOpen: boolean;
  listTitleRef: RefObject<(null | string)[]>;
  onChange: ((value: string) => void) | Dispatch<SetStateAction<string>>;
  selected: string;
  selectedIndex: number;
  setActiveIndex: Dispatch<SetStateAction<number>>;
  setSelectedIndex: Dispatch<SetStateAction<number>>;
};

type TSelectContextProviderProps = {
  children: ReactNode;
  value: TSelectContextValue;
};

export type { TSelectContextProviderProps, TSelectContextValue };
