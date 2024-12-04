import { type TUnstyledButtonProps } from '@shared/ui/Button';
import { type ReactElement } from 'react';

type TIconButtonProps = {
  children: ReactElement<HTMLOrSVGElement>;
  size: 'large' | 'medium' | 'small' | 'x-small';
  variant: 'label' | 'outlined' | 'primary' | 'secondary';
} & Omit<TUnstyledButtonProps<'button'>, 'as' | 'children'>;

export type { TIconButtonProps };
