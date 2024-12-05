import { type Meta, type StoryObj } from '@storybook/react';

import { type TUnderlineInputProps } from '../types/TUnderlineInputProps';
import { default as UnderlineInput } from '../ui/UnderlineInput';

const meta: Meta<TUnderlineInputProps> = {
  args: {
    value: 'Экзы 2024'
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['invisible', 'affordance']
    }
  },
  component: UnderlineInput,
  title: 'UIKit/Input/UnderlineInput'
};

export default meta;

type UnderlineInputStory = StoryObj<typeof UnderlineInput>;

export const Invisible: UnderlineInputStory = {
  args: {
    variant: 'invisible'
  }
};

export const Affordance: UnderlineInputStory = {
  args: {
    variant: 'affordance'
  }
};
