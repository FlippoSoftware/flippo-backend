/* eslint-disable @typescript-eslint/no-redundant-type-constituents */

import { type ComponentProps, type ReactElement } from 'react';

type TMenuHandlerProps = {
  children: ComponentProps<any> | ReactElement;
} & ComponentProps<any>;

export type { TMenuHandlerProps };
