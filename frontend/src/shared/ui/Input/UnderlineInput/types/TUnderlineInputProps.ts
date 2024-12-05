import { type ComponentPropsWithRef } from 'react';

type TUnderlineInputProps = {
  variant: 'affordance' | 'invisible';
} & ComponentPropsWithRef<'input'>;

export type { TUnderlineInputProps };
