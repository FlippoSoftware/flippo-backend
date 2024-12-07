import { AddIcon } from '@shared/icons';
import { type Meta, type StoryObj } from '@storybook/react';

import { type TTabProps } from '../types/TTabProps';
import { default as Tab } from '../ui/Tab';

const meta: Meta<TTabProps> = {
  args: {
    onClick: () => {}
  },
  argTypes: {
    'aria-controls': { control: 'text', description: 'Reflects which tabpanel this tab is linked to' },
    'aria-label': { control: 'text', description: 'A hint for the screen reader for the icon' },
    'aria-selected': { control: 'boolean', description: 'Reflects the selected tab or not' },
    icon: { control: false, description: 'Icon to display on the left relative to the tab' },
    title: { control: 'text', description: 'The text content of the tab' }
  },
  component: Tab,
  title: 'UIKit/TabList/Tab'
};

export default meta;

type TabStory = StoryObj<typeof Tab>;

export const Default: TabStory = {
  args: {
    icon: <AddIcon type={'default'} />,
    title: 'Tab'
  }
};
