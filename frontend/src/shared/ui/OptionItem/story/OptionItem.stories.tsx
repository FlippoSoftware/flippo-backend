import { AddIcon } from '@shared/icons';
import { StoryCombine, type TStoryCombineProps } from '@shared/ui/StoryCombine';
import { type Meta, type StoryObj } from '@storybook/react';

import { type TOptionProps } from '../types/TOptionItemProps';
import { default as OptionItem } from '../ui/OptionItem';

const meta: Meta<TOptionProps> = {
  argTypes: {
    'aria-selected': {
      control: 'boolean',
      defaultValue: false,
      description: 'Whether the choice item is selected or not.'
    },
    icon: {
      control: false,
      description: 'Icon to display on the left relative to the choice item'
    },
    title: {
      control: 'text',
      description: 'The text content of the choice item'
    },
    value: {
      control: 'text',
      description: 'The value associated with the choice item'
    }
  },
  component: OptionItem,
  parameters: {
    docs: {
      description: {
        component: 'The OptionItem component will be used in selectors.'
      }
    }
  },
  title: 'UIKit/Item/OptionItem'
};

export default meta;

type OptionStory = StoryObj<typeof OptionItem>;

export const Default: OptionStory = {
  args: {
    icon: <AddIcon type={'default'} />,
    onClick: (value: string) => {
      console.log(value);
    },
    title: 'Option item'
  }
};

export const OptionItemStoryCombine: OptionStory = {
  parameters: {
    controls: {
      disable: true
    }
  },
  render: () => <StoryCombine {...GROUPS} />
};

const GROUPS: TStoryCombineProps<TOptionProps> = {
  args: {
    icon: <AddIcon type={'default'} />,
    title: 'Option'
  },
  component: OptionItem,
  groups: [
    {
      groupArgs: {
        onClick: (value: string) => {
          console.log(value);
        },
        role: 'option'
      },
      name: 'Option',
      variants: [
        { components: [{}], name: 'Default' },
        { components: [{ disabled: true }], name: 'Disabled' },
        { components: [{ 'aria-selected': true }], name: 'Selected' }
      ]
    }
  ]
};
