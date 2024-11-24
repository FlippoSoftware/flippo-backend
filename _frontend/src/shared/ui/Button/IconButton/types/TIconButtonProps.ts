import { type TUnstyledButtonProps } from '@ui/Button/types/TUnstyledButtonProps';
import { type ReactElement } from 'react';

type TIconButtonProps = {
  children: ReactElement<HTMLOrSVGElement>;
  size: 'large' | 'medium' | 'small' | 'x-small';
  variant: 'label' | 'outlined' | 'primary' | 'secondary';
} & Omit<TUnstyledButtonProps<'button'>, 'as' | 'children'>;

export type { TIconButtonProps };
