import { StoryCombine, type TGroup, type TStoryCombineProps } from '@shared/ui/StoryCombine';
import { type Meta, type StoryObj } from '@storybook/react';
import { type ChangeEvent, useState } from 'react';

import { type TSearchInputProps } from '../types/TSearchInputProps';
import { default as SearchInput } from '../ui/SearchInput';
import st from './Decorator.module.scss';

function Decorator(Story: any) {
  return (
    <div className={st.decorator}>
      <Story />
    </div>
  );
}

const ARGS: Partial<TSearchInputProps> = {
  placeholder: 'Search'
};

const meta: Meta<typeof SearchInput> = {
  args: ARGS,
  argTypes: {
    placeholder: { control: 'text' },
    size: { control: 'select', options: ['large', 'regular'] }
  },
  component: SearchInput,
  title: 'UIKit/Input/SearchInput'
};

export default meta;

type SearchInputStory = StoryObj<typeof SearchInput>;

type TInputWithHooks = { initValue?: string } & Omit<TSearchInputProps, 'onClickClearButton' | 'placeholder' | 'value'>;

function InputWithHooks(props: TInputWithHooks) {
  const { initValue = '', ...otherProps } = props;
  const [value, setValue] = useState<string>(initValue);
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const onClickClearButton = () => {
    setValue('');
  };

  return (
    <SearchInput
      onChange={handleChange}
      onClickClearButton={onClickClearButton}
      placeholder={'Search'}
      value={value}
      {...otherProps}
    />
  );
}

export const LargeSearchInput: SearchInputStory = {
  decorators: Decorator,
  render: () => <InputWithHooks size={'large'} />
};

export const RegularSearchInput: SearchInputStory = {
  decorators: Decorator,
  render: () => <InputWithHooks size={'regular'} />
};

export const SearchInputStoryCombine: SearchInputStory = {
  render: () => <StoryCombine {...GROUPS} />
};

const VARIANTS: TGroup<TInputWithHooks>['variants'] = [
  { components: [{}], name: 'Empty' },
  { components: [{ initValue: 'pupa' }], name: 'filled' }
];

const GROUPS: TStoryCombineProps<TInputWithHooks> = {
  component: InputWithHooks,
  groups: [
    {
      groupArgs: { size: 'large' },
      name: 'Large',
      variants: VARIANTS
    },
    {
      groupArgs: { size: 'regular' },
      name: 'Regular',
      variants: VARIANTS
    }
  ]
};
