import clsx from 'clsx';

import { type TMenuItemProps } from '../types/TMenuItemProps';
import st from './MenuItem.module.scss';

function MenuItem(props: TMenuItemProps) {
  const { icon, title, variant = 'nonDestructive', ...otherProps } = props;

  return (
    <button
      className={clsx(st.menuItem, variant === 'destructive' && st.destructive)}
      role={'menuitem'}
      {...otherProps}
    >
      {icon}
      <span>{title}</span>
    </button>
  );
}

export default MenuItem;
