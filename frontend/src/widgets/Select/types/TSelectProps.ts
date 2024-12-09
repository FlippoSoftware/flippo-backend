import { type TOptionProps } from '@shared/ui/OptionItem';
import { type ReactElement } from 'react';

type TSelectProps = {
  defaultOption?: number;
  groups: Omit<TOptionProps, 'aria-selected' | 'onClick'>[][];
  icon: ReactElement;
  onSelected: (index: number) => void;
  placeholder: string;
  selected: null | number;
  variantDropdown?: 'left' | 'right';
};

export type { TSelectProps };
