import { type PropsWithChildren } from 'react';

import { type TAnimation, type TOffset, type TPlacement } from './TMenuContextValue';

type TMenuProps = PropsWithChildren<{
  animation?: TAnimation;
  offset?: TOffset;
  placement?: TPlacement;
}>;

export type { TMenuProps };
