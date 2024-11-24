import type { Meta, StoryObj } from '@storybook/react';

import { StoryCombine, type TGroup, type TStoryCombineProps } from '@ui/StoryCombine';
import { useState } from 'react';

import { type TFormInputProps } from '../types/TFormInputProps';
import { default as FormInput } from '../ui/FormInput';
import st from './Decorator.module.scss';

function Decorator(Story: any) {
  return (
    <div className={st.decorator}>
      <Story />
    </div>
  );
}

const ARGS: Partial<TFormInputProps> = {
  placeholder: 'E-Mail',
  size: 'large',
  type: 'email'
};

const meta: Meta<TFormInputProps> = {
  args: ARGS,
  argTypes: {
    errorMessage: { control: 'text' },
    icon: { control: false, description: 'The icon to display on the left relative to the input' },
    placeholder: { control: 'text' },
    size: { control: 'select', options: ['large', 'regular'] },
    type: { control: 'select', options: ['email', 'number', 'password', 'search', 'tel', 'text', 'url'] }
  },
  component: FormInput,
  title: 'UIKit/Input/FormInput'
};

export default meta;

type FormInputStory = StoryObj<typeof FormInput>;

export const FormInputDefault: FormInputStory = {
  args: ARGS,
  decorators: Decorator
};

export const FormInputInvalid: FormInputStory = {
  args: {
    errorMessage: 'Invalid email length',
    minLength: 5,
    type: 'email',
    value: 'popa'
  },
  decorators: Decorator
};

export const FormInputLongErrorMessage: FormInputStory = {
  args: {
    errorMessage: 'Invalid email length f fkl flklkf lkllllllllllklklkklfjlkklfff ffff',
    minLength: 5,
    type: 'email',
    value: 'popa'
  },
  decorators: Decorator
};

function FormInputErrorSwitch() {
  const [error, setError] = useState<string>('');

  const ERROR = 'Invalid email';

  const onClick = () => {
    if (error) setError('');
    else setError(ERROR);
  };

  return (
    <div className={st.errorSwitchContainer}>
      <FormInput errorMessage={error} placeholder={'E-Mail'} size={'large'} type={'email'} />
      <button onClick={onClick}>{error ? 'Clear error' : 'Set error'}</button>
    </div>
  );
}

export const FormInputSwitch: FormInputStory = {
  decorators: Decorator,
  name: 'FormInputErrorSwitch',
  render: () => <FormInputErrorSwitch />
};

export const FormInputStoryCombine: FormInputStory = {
  render: () => <StoryCombine {...GROUPS} />
};

const VARIANTS: TGroup<TFormInputProps>['variants'] = [
  { components: [{}], name: 'Empty' },
  { components: [{ value: 'aboba2002@gmail.com' }], name: 'Filled' },
  {
    components: [
      { errorMessage: 'Invalid input', value: 'aboba' },
      {
        errorMessage:
          'gjjjjjjjjjjjjjjjjfgvgvkvgvg v hgggggggggggggggggggggggggggggggggggggggggvhvhggkkkkkkkkkkkkkkkknljkkh',
        value: 'bfyfhii'
      }
    ],
    name: 'Invalid'
  }
];

const GROUPS: TStoryCombineProps<TFormInputProps> = {
  args: ARGS,
  component: FormInput,
  decorator: (story) => <div className={st.decorator}>{story}</div>,
  groups: [
    { groupArgs: { size: 'large' }, name: 'Large', variants: VARIANTS },
    { groupArgs: { size: 'regular' }, name: 'Regular', variants: VARIANTS }
  ]
};
