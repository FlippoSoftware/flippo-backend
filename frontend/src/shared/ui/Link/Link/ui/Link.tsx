import { ArrowIcon } from '@shared/icons';
import { type RouteParams } from 'atomic-router';
import { Link as AtomicLink } from 'atomic-router-react';
import clsx from 'clsx';

import { type TLinkProps } from '../types/TLinkProps';
import st from './Link.module.scss';

function Link<Params extends RouteParams = object>(props: TLinkProps<Params>) {
  const { children, icon, variant = 'neutral', ...otherProps } = props;

  return (
    <AtomicLink {...otherProps} className={clsx(st.anchor, st[variant])}>
      {icon ? <div className={st.icon}>{icon}</div> : null}
      <div className={st.text}>
        <span>{children}</span>
        <ArrowIcon className={st.arrow} type={'link'} />
      </div>
    </AtomicLink>
  );
}

export default Link;
