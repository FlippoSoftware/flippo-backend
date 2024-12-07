import clsx from 'clsx';
import { useCallback } from 'react';

import { type TMenuItemProps } from '../types/TMenuItemProps';
import st from './MenuItem.module.scss';

function MenuItem<E extends 'menuitem' | 'option' = 'option'>(props: TMenuItemProps<E>) {
  const { icon, onClick, title, value, variant = 'nonDestructive', ...otherProps } = props;
  const { isSelected, ...propsWithOutIsSelected } =
    'isSelected' in otherProps ? otherProps : { isSelected: false, ...otherProps };

  const handelClick = useCallback(() => {
    if ('isSelected' in props && props.isSelected) return;

    onClick(value);
  }, [value, onClick, props]);

  return (
    <button
      className={clsx(st.menuItem, st[variant], (isSelected as boolean) && st.selected)}
      onClick={() => handelClick()}
      {...propsWithOutIsSelected}
    >
      {icon}
      <span>{title}</span>
    </button>
  );
}

export default MenuItem;
