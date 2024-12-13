import clsx from 'clsx';

import { type TItemProps } from '../types/TItemProps';
import st from './Item.module.scss';

function Item(props: TItemProps) {
  const { disabled = false, icon, title, variant = 'nonDestructive', ...otherProps } = props;

  return (
    <div
      className={clsx(st.item, variant === 'destructive' && st.destructive)}
      data-disabled={disabled}
      {...otherProps}
    >
      {icon}
      <span>{title}</span>
    </div>
  );
}

export default Item;
