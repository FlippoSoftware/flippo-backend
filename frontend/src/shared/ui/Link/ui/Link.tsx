import { ArrowIcon } from '@shared/icons';
import clsx from 'clsx';

import { type TLinkProps } from '../type/TLinkProps';
import st from './Link.module.scss';

function Link(props: TLinkProps) {
  const { children, icon, variant = 'neutral', ...otherProps } = props;

  return (
    <a {...otherProps} className={clsx(st.anchor, st[variant])}>
      {icon ? <div className={st.icon}>{icon}</div> : null}
      <div className={st.text}>
        <span>{children}</span>
        <ArrowIcon className={st.arrow} type={'link'} />
      </div>
    </a>
  );
}

export default Link;
