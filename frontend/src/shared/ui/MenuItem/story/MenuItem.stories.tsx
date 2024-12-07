import { AddIcon } from '@shared/icons';
import { StoryCombine, type TStoryCombineProps } from '@shared/ui/StoryCombine';
import { type Meta, type StoryObj } from '@storybook/react';

import { type TMenuItemProps } from '../types/TMenuItemProps';
import { default as MenuItem } from '../ui/MenuItem';

const meta: Meta<TMenuItemProps> = {
  argTypes: {
    icon: {
      control: false,
      description: 'Icon to display on the left relative to the choice item'
    },
    title: {
      control: 'text',
      description: 'The text content of the choice item'
    },
    variant: {
      control: 'select',
      description: 'The visual appearance of the item.',
      options: ['nonDestructive', 'destructive']
    }
  },
  component: MenuItem,
  parameters: {
    docs: {
      description: {
        component: 'The MenuItem component will be used in action menu.'
      }
    }
  },
  title: 'UIKit/Item/MenuItem'
};

export default meta;

type MenuItemStory = StoryObj<typeof MenuItem>;

export const Default: MenuItemStory = {
  args: {
    icon: <AddIcon type={'default'} />,
    title: 'Menu item'
  }
};

export const MenuItemStoryCombine: MenuItemStory = {
  parameters: {
    controls: {
      disable: true
    }
  },
  render: () => <StoryCombine {...GROUPS} />
};

const GROUPS: TStoryCombineProps<TMenuItemProps> = {
  args: {
    icon: <AddIcon type={'default'} />,
    title: 'Menu item'
  },
  component: MenuItem,
  groups: [
    {
      groupArgs: { onClick: () => {}, role: 'menuitem', variant: 'nonDestructive' },
      name: 'Menu item',
      variants: [
        { components: [{}], name: 'Default' },
        { components: [{ disabled: true }], name: 'Disabled' },
        { components: [{ variant: 'destructive' }], name: 'Destructive' }
      ]
    }
  ]
};
