import clsx from 'clsx';

import { type TMenuItemProps } from '../types/TMenuItemProps';
import st from './MenuItem.module.scss';

function MenuItem(props: TMenuItemProps) {
  const { icon, title, variant = 'nonDestructive', ...otherProps } = props;

  return (
    <div className={clsx(st.menuItem, variant === 'destructive' && st.destructive)} role={'menuitem'} {...otherProps}>
      {icon}
      <span>{title}</span>
    </div>
  );
}

export default MenuItem;
