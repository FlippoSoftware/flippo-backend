import type React from 'react';

import { type AnchorHTMLAttributes } from 'react';

type TLinkProps = {
  children: string;
  icon?: React.JSX.Element;
  variant: 'brand' | 'neutral';
} & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'children'>;

export { type TLinkProps };
