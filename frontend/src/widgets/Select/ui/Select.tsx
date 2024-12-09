import { useClickOutside } from '@shared/hooks';
import { ChevronIcon } from '@shared/icons';
import { OptionItem } from '@shared/ui/OptionItem';
import { Separator } from '@shared/ui/Separator';
import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
import { Fragment, memo, useRef, useState } from 'react';
import useMeasure from 'react-use-measure';

import { type TSelectProps } from '../types/TSelectProps';
import st from './Select.module.scss';

function Select(props: TSelectProps) {
  const {
    defaultOption = 0,
    groups,
    icon,
    onSelected,
    placeholder,
    selected: selectedOutside,
    variantDropdown = 'right'
  } = props;
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [scope, { width }] = useMeasure();
  const listBoxRef = useRef<HTMLDivElement | null>(null);

  useClickOutside(listBoxRef, () => setIsOpen(false));

  const getFlatIndex = (groupIndex: number, optionIndex: number) => {
    return groups.slice(0, groupIndex).flat(1).length + optionIndex;
  };

  const onOptionClick = (groupIndex: number, optionIndex: number) => {
    setIsOpen(false);

    const index = getFlatIndex(groupIndex, optionIndex);
    onSelected(index);
  };

  const onComboBoxClick = () => {
    if (!listBoxRef.current) setIsOpen((prev) => !prev);
  };

  const selected = selectedOutside || defaultOption;

  return (
    <motion.div animate={{ width: width }} className={clsx(st.selectWrapper, st[variantDropdown])} role={'listbox'}>
      <div className={st.hiddenLabel} id={`select-${placeholder}`}>
        {placeholder}
      </div>
      <button
        aria-activedescendant={`option-${selected}`}
        aria-controls={`listbox-${placeholder}`}
        aria-expanded={isOpen}
        aria-haspopup={'listbox'}
        aria-labelledby={`select-${placeholder}`}
        className={clsx(st.combobox, isOpen && st.comboboxOpen)}
        onClick={onComboBoxClick}
        ref={scope}
        role={'combobox'}
        tabIndex={0}
      >
        {icon}
        <span>{selected !== defaultOption ? groups.flat(1)[selected].title : placeholder}</span>
        <ChevronIcon className={clsx(st.arrow, isOpen && st.arrowOpen)} type={'bottom'} />
      </button>
      <AnimatePresence>
        {isOpen ? (
          <motion.div
            animate={{ height: 'fit-content', opacity: 1, padding: '6 6' }}
            aria-labelledby={`select-${placeholder}`}
            className={st.listbox}
            exit={{ height: 0, opacity: 0, padding: '0 6' }}
            id={`listbox-${placeholder}`}
            initial={{ height: 0, opacity: 0, padding: '0 6' }}
            ref={listBoxRef}
            role={'listbox'}
            tabIndex={-1}
          >
            <p className={st.placeholder} role={'presentation'}>
              {placeholder}
            </p>
            {groups.map((group, groupIndex) => (
              <Fragment key={`fragment-${groupIndex}`}>
                {group.map(({ ...otherItemProps }, optionIndex) => (
                  <OptionItem
                    {...otherItemProps}
                    aria-selected={selected === getFlatIndex(groupIndex, optionIndex)}
                    id={`option-${optionIndex}`}
                    key={`option-${optionIndex}`}
                    onClick={() => onOptionClick(groupIndex, optionIndex)}
                  />
                ))}
                {groupIndex !== groups.length - 1 ? (
                  <Separator
                    key={`separator-${groupIndex}`}
                    orientation={'horizontal'}
                    role={'presentation'}
                    spacing={'spacing-6'}
                  />
                ) : null}
              </Fragment>
            ))}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.div>
  );
}

export default memo(Select);
