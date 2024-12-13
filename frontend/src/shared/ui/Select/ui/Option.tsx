import clsx from 'clsx';
import { useEffect } from 'react';

import { type TOptionProps } from '../types/TOptionProps';
import st from './Select.module.scss';
import { useSelect } from './SelectContext';

function Option(props: TOptionProps) {
  const { className, icon, index, title, value, ...otherProps } = props;
  const { activeIndex, listTitleRef, onChange, selected, setActiveIndex, setSelectedIndex } = useSelect();

  const handleOption = () => {
    onChange(value);
    setSelectedIndex(index as number);
  };

  useEffect(() => {
    if (listTitleRef.current) listTitleRef.current[index as number] = title;

    if (selected === value) setSelectedIndex(index as number);
  }, [title, index, listTitleRef, selected, value, setSelectedIndex]);

  return (
    <button
      {...otherProps}
      aria-selected={selected === value}
      className={clsx(st.option, className)}
      data-selected={selected === value}
      id={`option-${index}`}
      onClick={handleOption}
      onFocus={() => setActiveIndex(index as number)}
      onMouseEnter={() => setActiveIndex(index as number)}
      role={'option'}
      tabIndex={activeIndex === index ? 0 : 1}
    >
      {icon}
      <span>{title}</span>
    </button>
  );
}

export default Option;
