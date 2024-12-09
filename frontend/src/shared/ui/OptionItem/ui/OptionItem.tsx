import { type TOptionProps } from '../types/TOptionItemProps';
import st from './OptionItem.module.scss';

function Option(props: TOptionProps) {
  const { icon, onClick, title, ...otherProps } = props;

  return (
    <button className={st.optionItem} onClick={onClick} role={'option'} {...otherProps}>
      {icon}
      <span>{title}</span>
    </button>
  );
}

export default Option;
