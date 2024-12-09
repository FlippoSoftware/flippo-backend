import { type ComponentProps, type ReactElement } from 'react';

type TOption = {
  'aria-selected': boolean;
  icon: ReactElement;
  onClick: () => void;
  title: string;
};

type TOptionProps = Omit<ComponentProps<'button'>, keyof TOption> & TOption;

export type { TOption, TOptionProps };
