import { FolderIcon, SetIcon } from '@shared/icons';
import { type Meta, type StoryObj } from '@storybook/react';
import { useEffect, useState } from 'react';

import { type TTabOwnProps } from '../Tab';
import { type TTabListProps } from '../types/TTabListProps';
import { default as TabList } from '../ui/TabList';

const meta: Meta<TTabListProps> = {
  argTypes: {
    onTabChange: {
      control: {
        disable: true,
        type: 'object'
      },
      description: 'The function passed to the Tab component to change the "selected"'
    },
    selected: {
      control: 'text',
      description: 'Is equal to the id of the selected tabpanel in the format `tabpanel-${string}`'
    },
    tabs: {
      control: {
        disable: true,
        type: 'object'
      },
      description: 'An array with tabs for rendering'
    }
  },
  component: TabList,
  title: 'UIKit/TabList/TabList'
};

export default meta;

type TabListStory = StoryObj<typeof TabList>;

const TABS: Omit<TTabOwnProps, 'onClick'>[] = [
  { 'aria-controls': 'tabpanel-1', 'aria-selected': true, icon: <SetIcon />, title: 'Наборы (8)' },
  { 'aria-controls': 'tabpanel-2', 'aria-selected': false, icon: <FolderIcon type={'stack'} />, title: 'Папки (2)' }
];

export const Default: TabListStory = {
  parameters: {
    controls: {
      disable: true
    }
  },
  render: () => <WithTabChange />
};

function WithTabChange() {
  const [selected, setSelected] = useState<TTabOwnProps['aria-controls']>('tabpanel-1');

  useEffect(() => {
    TABS.forEach((tab) =>
      tab['aria-controls'] === selected ? (tab['aria-selected'] = false) : (tab['aria-selected'] = true)
    );
  }, [selected]);

  const onChange = (tab: TTabOwnProps['aria-controls']) => {
    setSelected(tab);
  };

  return <TabList onTabChange={onChange} selected={selected} tabs={TABS} />;
}
