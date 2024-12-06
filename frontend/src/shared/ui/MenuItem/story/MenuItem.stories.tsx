import { AddIcon } from '@shared/icons';
import { StoryCombine, type TStoryCombineProps } from '@shared/ui/StoryCombine';
import { type Meta, type StoryObj } from '@storybook/react';

import { type TMenuItemProps } from '../types/TMenuItemProps';
import { default as MenuItem } from '../ui/MenuItem';

const meta: Meta<TMenuItemProps> = {
  args: {
    icon: <AddIcon type={'default'} />,
    onClick: (value: string) => {
      console.log(value);
    },
    title: 'Option',
    value: '01'
  },
  argTypes: {
    icon: {
      control: false,
      description: 'Icon to display on the left relative to the menu item'
    },
    isSelected: {
      control: 'boolean',
      defaultValue: false,
      description: 'Whether the menu item is selected or not. Available only with the "option" role.'
    },
    role: {
      control: 'select',
      description: 'The semantic meaning of the item',
      options: ['menuitem', 'option']
    },
    title: {
      control: 'text',
      description: 'The text content of the menu item'
    },
    value: {
      control: 'text',
      description: 'The value associated with the menu item'
    },
    variant: {
      control: 'select',
      description:
        'The visual appearance of the item. With the "option" role, it can only take the value "nonDestructive"',
      options: ['nonDestructive', 'destructive']
    }
  },
  component: MenuItem,
  parameters: {
    docs: {
      description: {
        component: 'The MenuItem component will be used in selectors and in the additional actions menu.'
      }
    }
  },
  title: 'UIKit/MenuItem'
};

export default meta;

type MenuItemStory = StoryObj<typeof MenuItem>;

export const NonDestructive: MenuItemStory = {
  args: {
    role: 'option',
    variant: 'nonDestructive'
  }
};

export const Destructive: MenuItemStory = {
  args: {
    role: 'menuitem',
    variant: 'destructive'
  }
};

export const MenuItemStoryCombine: MenuItemStory = {
  parameters: {
    controls: {
      disable: true
    }
  },
  render: () => <StoryCombine<TMenuItemProps<'menuitem' | 'option'>> {...GROUPS} />
};

const GROUPS: TStoryCombineProps<TMenuItemProps<'menuitem' | 'option'>> = {
  args: {
    icon: <AddIcon type={'default'} />,
    onClick: (value: string) => {
      console.log(value);
    },
    title: 'Option'
  },
  component: MenuItem,
  groups: [
    {
      groupArgs: { role: 'option', variant: 'nonDestructive' },
      name: 'Option',
      variants: [
        { components: [{}], name: 'Default' },
        { components: [{ disabled: true }], name: 'Disabled' },
        { components: [{ isSelected: true }], name: 'Selected' }
      ]
    },
    {
      groupArgs: { role: 'menuitem', variant: 'nonDestructive' },
      name: 'Menu item',
      variants: [
        { components: [{}], name: 'Default' },
        { components: [{ disabled: true }], name: 'Disabled' },
        { components: [{ variant: 'destructive' }], name: 'Destructive' }
      ]
    }
  ]
};
