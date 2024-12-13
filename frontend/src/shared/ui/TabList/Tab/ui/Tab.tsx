import { motion } from 'framer-motion';

import { type TTabProps } from '../types/TTabProps';
import st from './Tab.module.scss';

function Tab(props: TTabProps) {
  const { icon, onClick, title, ...otherProps } = props;

  return (
    <button className={st.tab} onClick={() => onClick(props['aria-controls'])} role={'tab'} {...otherProps}>
      <div aria-label={props['aria-label']}>{icon}</div>
      {title}
      {props['aria-selected'] ? <SelectedLine /> : null}
    </button>
  );
}

export default Tab;

function SelectedLine() {
  return <motion.div className={st.selectedLine} layoutId={'selectedTabLine'} />;
}
