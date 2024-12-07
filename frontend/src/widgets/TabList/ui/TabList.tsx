import { memo } from 'react';

import Tab from '../Tab/ui/Tab';
import { type TTabListProps } from '../types/TTabListProps';
import st from './TabList.module.scss';

function TabList(props: TTabListProps) {
  const { onTabChange, selected, tabs } = props;

  return (
    <div aria-orientation={'horizontal'} className={st.tabList} role={'tablist'}>
      {tabs.map((tab) => (
        <Tab
          key={tab['aria-controls']}
          onClick={onTabChange}
          tabIndex={selected === tab['aria-controls'] ? 1 : -1}
          {...tab}
        />
      ))}
    </div>
  );
}

export default memo(TabList);
