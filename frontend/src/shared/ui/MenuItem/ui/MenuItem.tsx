import clsx from 'clsx';
import { useCallback } from 'react';

import { type TMenuItemProps } from '../types/TMenuItemProps';
import st from './MenuItem.module.scss';

function MenuItem<E extends 'menuitem' | 'option' = 'option'>(props: TMenuItemProps<E>) {
  const { icon, onClick, title, value, variant = 'nonDestructive', ...otherProps } = props;

  const handelClick = useCallback(() => {
    if ('isSelected' in props && props.isSelected) return;

    onClick(value);
  }, [value, onClick, props]);

  return (
    <button
      className={clsx(st.menuItem, st[variant], 'isSelected' in props && props.isSelected && st.selected)}
      onClick={() => handelClick()}
      {...otherProps}
    >
      {icon}
      <span>{title}</span>
    </button>
  );
}

export default MenuItem;
