import { useCallback } from 'react';

import { type TOptionProps } from '../types/TOptionItemProps';
import st from './OptionItem.module.scss';

function Option(props: TOptionProps) {
  const { icon, onClick, title, value, ...otherProps } = props;

  const onOptionClick = useCallback(() => {
    onClick(value);
  }, [value, onClick]);

  return (
    <button className={st.optionItem} onClick={() => onOptionClick()} role={'option'} {...otherProps}>
      {icon}
      <span>{title}</span>
    </button>
  );
}

export default Option;
