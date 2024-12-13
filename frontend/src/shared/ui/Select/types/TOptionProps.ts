import { type ComponentProps, type ReactElement } from 'react';

type TOptionOwnProps = { icon: ReactElement; index?: number; title: string; value: string };

type TOptionProps = Omit<ComponentProps<'button'>, 'role' | keyof TOptionOwnProps> & TOptionOwnProps;

export type { TOptionProps };
