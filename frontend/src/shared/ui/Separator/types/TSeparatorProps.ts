import { type HTMLAttributes } from 'react';

type TSeparatorProps = {
  orientation: 'horizontal' | 'vertical';
  spacing?: 'spacing-4' | 'spacing-6' | 'spacing-8' | 'spacing-10' | 'spacing-12';
} & HTMLAttributes<HTMLHRElement>;

export { type TSeparatorProps };
