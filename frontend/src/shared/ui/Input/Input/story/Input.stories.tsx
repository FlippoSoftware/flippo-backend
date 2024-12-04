import { SearchIcon } from '@shared/icons';
import { StoryCombine, type TGroup, type TStoryCombineProps } from '@shared/ui/StoryCombine';
import { type Meta, type StoryObj } from '@storybook/react';

import { type TInputProps } from '../types/TInputProps';
import { default as Input } from '../ui/Input';
import st from './Decorator.module.scss';

function Decorator(Story: any) {
  return (
    <div className={st.decorator}>
      <Story />
    </div>
  );
}

const ARGS: Partial<TInputProps> = {
  placeholder: 'Input',
  type: 'text'
};

const meta: Meta<typeof Input> = {
  args: ARGS,
  argTypes: {
    icon: { control: false, description: 'The icon to display on the left relative to the input' },
    placeholder: { control: 'text' },
    size: { control: 'select', options: ['large', 'regular'] },
    type: { control: 'select', options: ['email', 'number', 'password', 'search', 'tel', 'text', 'url'] }
  },
  component: Input,
  title: 'UIKit/Input/Input'
};

export default meta;

type InputStory = StoryObj<typeof Input>;

export const LargeInput: InputStory = {
  args: {
    size: 'large'
  },
  decorators: Decorator
};

export const LargeInputWithIcon: InputStory = {
  args: {
    icon: <SearchIcon />,
    size: 'large'
  },
  decorators: Decorator
};

export const RegularInput: InputStory = {
  args: {
    size: 'regular'
  },
  decorators: Decorator
};

export const RegularInputWithIcon: InputStory = {
  args: {
    icon: <SearchIcon />,
    size: 'regular'
  },
  decorators: Decorator
};

export const InputStoryCombine: InputStory = {
  render: () => <StoryCombine {...GROUPS} />
};

const VARIANTS: TGroup<TInputProps>['variants'] = [
  { components: [{}], name: 'Default' },
  { components: [{ icon: <SearchIcon /> }], name: 'With icon' }
];

const GROUPS: TStoryCombineProps<TInputProps> = {
  args: ARGS,
  component: Input,
  decorator: (story) => <div className={st.decorator}>{story}</div>,
  groups: [
    { groupArgs: { size: 'large' }, name: 'Large', variants: VARIANTS },
    { groupArgs: { size: 'regular' }, name: 'Regular', variants: VARIANTS }
  ]
};
