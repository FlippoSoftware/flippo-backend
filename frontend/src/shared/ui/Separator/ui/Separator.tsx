import clsx from 'clsx';

import { type TSeparatorProps } from '../types/TSeparatorProps';
import st from './Separator.module.scss';

function Separator(props: TSeparatorProps) {
  const { orientation = 'horizontal', spacing, ...otherProps } = props;

  return (
    <div className={clsx(st.separatorWrap, st[orientation], !!spacing && st[spacing])} role={'presentation'}>
      <hr className={st.separator} {...otherProps} />
    </div>
  );
}

export default Separator;
