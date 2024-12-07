import { type ComponentPropsWithRef, type ReactElement } from 'react';

type TTabOwnProps = {
  'aria-controls': `tabpanel-${string}`;
  'aria-label'?: string;
  'aria-selected': boolean;
  icon: ReactElement;
  onClick: (tab: `tabpanel-${string}`) => void;
  title: string;
};

type TTabProps = Omit<ComponentPropsWithRef<'button'>, keyof TTabOwnProps> & TTabOwnProps;

export type { TTabOwnProps, TTabProps };
