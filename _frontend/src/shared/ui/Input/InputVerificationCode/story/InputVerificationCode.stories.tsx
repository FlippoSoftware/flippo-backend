import { type Meta, type StoryObj } from '@storybook/react';
import { StoryCombine, type TGroup, type TStoryCombineProps } from '@ui/StoryCombine';

import { type TInputVerificationCodeProps } from '../types/TInputVerificationCode';
import { default as InputVerificationCode } from '../ui/InputVerificationCode';

const ARGS: TInputVerificationCodeProps = {
  length: 5,
  placeholder: '',
  variant: 'number'
};

const meta: Meta<TInputVerificationCodeProps> = {
  args: ARGS,
  argTypes: {
    invalid: { control: 'boolean' },
    valid: { control: 'boolean' }
  },
  component: InputVerificationCode,
  title: 'uikit/Input/InputVerificationCode'
};

export default meta;

type InputVerificationCodeStory = StoryObj<typeof InputVerificationCode>;

export const InputVerificationCodeDefault: InputVerificationCodeStory = {};

export const InputVerificationCodeFilled: InputVerificationCodeStory = {
  args: {
    value: '123'
  }
};

export const InputVerificationCodeFullFilled: InputVerificationCodeStory = {
  args: {
    autoFocus: false,
    value: '12345'
  }
};

export const InputVerificationCodeInvalid: InputVerificationCodeStory = {
  args: {
    autoFocus: false,
    invalid: true,
    value: '12345'
  }
};

export const InputVerificationCodeValid: InputVerificationCodeStory = {
  args: {
    autoFocus: false,
    valid: true,
    value: '12345'
  }
};

export const InputVerificationCodeStoryCombine: InputVerificationCodeStory = {
  render: () => <StoryCombine {...GROUPS} />
};

const VARIANTS: TGroup<TInputVerificationCodeProps>['variants'] = [
  { components: [{ value: '' }], name: 'Empty' },
  { components: [{}], name: 'Full filled' },
  { components: [{ invalid: true }], name: 'Invalid' },
  { components: [{ valid: true }], name: 'Valid' }
];

const GROUPS: TStoryCombineProps<TInputVerificationCodeProps> = {
  args: {
    autoFocus: false,
    placeholder: ''
  },
  component: InputVerificationCode,
  groups: [
    {
      groupArgs: {
        value: '12345',
        variant: 'number'
      },
      name: 'Numeric',
      variants: [...VARIANTS, { components: [{ value: '123' }], name: 'Filled' }]
    },
    {
      groupArgs: {
        value: '1ff3G',
        variant: 'alphanumeric'
      },
      name: 'Alphanumeric',
      variants: [...VARIANTS, { components: [{ value: '1ff' }], name: 'Filled' }]
    }
  ]
};
