import { StoryCombine, type TGroup, type TStoryCombineProps } from '@shared/ui/StoryCombine';
import { type Meta, type StoryObj } from '@storybook/react';

import { type TSeparatorProps } from '../types/TSeparatorProps';
import Separator from '../ui/Separator';
import st from './Decorator.module.scss';

function Decorator(Story: any) {
  return (
    <div className={st.decorator}>
      <Story />
    </div>
  );
}

const meta: Meta<typeof Separator> = {
  argTypes: {
    orientation: {
      control: {
        options: ['horizontal', 'vertical'],
        type: 'select'
      }
    },
    spacing: {
      control: {
        options: ['spacing-4', 'spacing-6', 'spacing-8', 'spacing-10', 'spacing-12'],
        type: 'select'
      }
    }
  },
  component: Separator,
  title: 'UIKit/Separator'
};

export default meta;

type SeparatorStory = StoryObj<typeof Separator>;

export const HorizontalSeparator: SeparatorStory = {
  args: {
    orientation: 'horizontal',
    spacing: 'spacing-6'
  },
  decorators: Decorator
};

export const VerticalSeparator: SeparatorStory = {
  args: {
    orientation: 'vertical'
  },
  decorators: Decorator
};

export const SeparatorCombine: SeparatorStory = {
  argTypes: {
    orientation: {
      control: false
    },
    spacing: {
      control: false
    }
  },
  render: () => <StoryCombine {...GROUPS} />
};

const VARIANTS: TGroup<TSeparatorProps>['variants'] = [
  {
    components: [{}],
    name: 'Default'
  },
  {
    components: [{ spacing: 'spacing-4' }],
    name: 'Space 4'
  },
  {
    components: [{ spacing: 'spacing-6' }],
    name: 'Space 6'
  },
  {
    components: [{ spacing: 'spacing-8' }],
    name: 'Space 8'
  },
  {
    components: [{ spacing: 'spacing-10' }],
    name: 'Space 10'
  },
  {
    components: [{ spacing: 'spacing-12' }],
    name: 'Space 12'
  }
];

const GROUPS: TStoryCombineProps<TSeparatorProps> = {
  component: Separator,
  decorator: (story) => <div className={st.decorator}>{story}</div>,
  groups: [
    {
      groupArgs: { orientation: 'horizontal' },
      name: 'Horizontal Separator',
      variants: VARIANTS
    },
    {
      groupArgs: { orientation: 'vertical' },
      name: 'Vertical Separator',
      variants: VARIANTS
    }
  ]
};
