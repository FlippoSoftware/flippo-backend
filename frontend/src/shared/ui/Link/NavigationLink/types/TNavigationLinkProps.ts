import { type RouteInstance, type RouteParams } from 'atomic-router';
import { type LinkProps } from 'atomic-router-react';
import { type ReactElement } from 'react';

type TNavigationLinkProps<Params extends RouteParams> = {
  icon: ReactElement;
  size?: 'large' | 'small';
  title: string;
} & { to: RouteInstance<Params> } & Omit<
    LinkProps<Params>,
    'activeClassName' | 'className' | 'inactiveClassName' | 'to'
  >;

export type { TNavigationLinkProps };
