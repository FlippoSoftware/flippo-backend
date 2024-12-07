import { type RouteParams } from 'atomic-router';
import { type LinkProps } from 'atomic-router-react';
import { type ReactElement } from 'react';

type TLinkProps<Params extends RouteParams> = {
  icon?: ReactElement;
  variant: 'brand' | 'neutral';
} & LinkProps<Params>;

export { type TLinkProps };
