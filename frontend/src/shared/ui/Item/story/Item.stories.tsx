import { AddIcon } from '@shared/icons';
import { StoryCombine, type TStoryCombineProps } from '@shared/ui/StoryCombine';
import { type Meta, type StoryObj } from '@storybook/react';

import { type TItemProps } from '../types/TItemProps';
import { default as Item } from '../ui/Item';

const meta: Meta<TItemProps> = {
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
  component: Item,
  title: 'UIKit/Item'
};

export default meta;

type ItemStory = StoryObj<typeof Item>;

export const Default: ItemStory = {
  args: {
    icon: <AddIcon type={'default'} />,
    title: 'Item'
  }
};

export const ItemStoryCombine: ItemStory = {
  parameters: {
    controls: {
      disable: true
    }
  },
  render: () => <StoryCombine {...GROUPS} />
};

const GROUPS: TStoryCombineProps<TItemProps> = {
  args: {
    icon: <AddIcon type={'default'} />,
    title: 'Item'
  },
  component: Item,
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
