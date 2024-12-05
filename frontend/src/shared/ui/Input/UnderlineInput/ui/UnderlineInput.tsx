import clsx from 'clsx';

import { type TUnderlineInputProps } from '../types/TUnderlineInputProps';
import st from './UnderlineInput.module.scss';

function UnderlineInput(props: TUnderlineInputProps) {
  const { variant, ...otherProps } = props;

  return (
    <div className={clsx(st.inputWrapper, st[variant])}>
      <input className={st.input} {...otherProps} />
    </div>
  );
}

export default UnderlineInput;
