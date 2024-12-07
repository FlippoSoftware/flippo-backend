import { type ComponentProps, type ReactElement } from 'react';

type TOption = {
  'aria-selected': boolean;
  icon: ReactElement;
  onClick: (value: string) => void;
  title: string;
  value: string;
};

type TOptionProps = Omit<ComponentProps<'button'>, keyof TOption> & TOption;

export type { TOption, TOptionProps };
