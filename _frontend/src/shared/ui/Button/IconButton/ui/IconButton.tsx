import UnstyledButton from '@ui/Button/ui/UnstyledButton';
import clsx from 'clsx';

import { type TIconButtonProps } from '../types/TIconButtonProps';
import st from './IconButton.module.scss';

function IconButton(props: TIconButtonProps) {
  const { children, size, variant, ...otherProps } = props;

  return (
    <UnstyledButton as={'button'} className={clsx(st.iconButton, st[variant], st[size])} {...otherProps}>
      {children}
    </UnstyledButton>
  );
}

export default IconButton;
