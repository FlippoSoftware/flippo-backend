import { type RouteParams } from 'atomic-router';
import { Link } from 'atomic-router-react';
import clsx from 'clsx';

import { type TNavigationLinkProps } from '../types/TNavigationLinkProps';
import st from './NavigationLink.module.scss';

function NavigationTab<Params extends RouteParams>(props: TNavigationLinkProps<Params>) {
  const { icon, size = 'large', title, ...otherProps } = props;

  return (
    <Link
      activeClassName={st.activeLink}
      className={clsx(st.link, st[size])}
      inactiveClassName={st.inactiveLink}
      {...otherProps}
    >
      {icon}
      {title}
    </Link>
  );
}

export default NavigationTab;
