import Input from '@ui/Input/Input/ui/Input';
import { clsx } from 'clsx';

import type { TFormInputProps } from '../types/TFormInputProps';

import st from './FormInput.module.scss';

function FormInput(props: TFormInputProps) {
  const { className, errorMessage, ...otherProps } = props;

  return (
    <div className={clsx(st.inputGroup, !!errorMessage && st.show)}>
      <Input className={clsx(!!errorMessage && st.invalid, className)} {...otherProps} />
      <div className={clsx(st.errorWrap, !!errorMessage && st.show)}>
        <p className={st.error}>{errorMessage}</p>
      </div>
    </div>
  );
}

export default FormInput;
