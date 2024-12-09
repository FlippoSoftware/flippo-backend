import { CaptiveIcon, FavoriteIcon, GroupIcon, LinkIcon, PersonIcon, SuccessIcon } from '@shared/icons';
import { type Meta, type StoryObj } from '@storybook/react';
import { useState } from 'react';

import { type TSelectProps } from '../types/TSelectProps';
import { default as Select } from '../ui/Select';

const meta: Meta<TSelectProps> = {
  argTypes: {
    defaultOption: { control: 'number', description: 'The index of the default option.' },
    groups: { control: false, description: 'An array with arrays of options.' },
    icon: { control: false, description: 'The icon displayed for the selector on the left' },
    onSelected: {
      control: false,
      description: 'Functions for set a new active option. Accepts the option index as input.'
    },
    placeholder: {
      control: 'text',
      description: 'It is displayed as the default text for the selector and serves as a label for the drop-down list.'
    },
    selected: {
      control: false,
      description: 'The index of the selected option, if null, then the default option is selected.'
    },
    variantDropdown: {
      control: 'select',
      description: 'Determines which edge to align the drop-down list to.',
      options: ['left', 'right']
    }
  },
  component: Select,
  parameters: {
    docs: {
      description: {
        component: 'The component of selecting one of the options.'
      }
    }
  },
  title: 'Widgets/Select'
};

export default meta;

type SelectStory = StoryObj<typeof Select>;

const ICON = (
  <svg height={'24'} viewBox={'0 0 24 24'} width={'24'} xmlns={'http://www.w3.org/2000/svg'}>
    <path
      d={
        'M10.9999 20C10.7166 20 10.4792 19.904 10.2879 19.712C10.0966 19.52 10.0006 19.2827 9.99991 19V13L4.19991 5.6C3.94991 5.26667 3.91257 4.91667 4.08791 4.55C4.26324 4.18333 4.56724 4 4.99991 4H18.9999C19.4332 4 19.7376 4.18333 19.9129 4.55C20.0882 4.91667 20.0506 5.26667 19.7999 5.6L13.9999 13V19C13.9999 19.2833 13.9039 19.521 13.7119 19.713C13.5199 19.905 13.2826 20.0007 12.9999 20H10.9999ZM11.9999 12.3L16.9499 6H7.04991L11.9999 12.3Z'
      }
    />
  </svg>
);

const GROUPS = [
  [{ icon: <SuccessIcon type={'default'} />, title: 'All', value: '01' }],
  [
    { icon: <PersonIcon type={'check'} />, title: 'Created by you', value: '02' },
    {
      icon: <FavoriteIcon type={'default'} />,
      title: 'Added to the collection',
      value: '03'
    },
    { icon: <GroupIcon />, title: 'Shared with you', value: '04' }
  ],
  [
    { icon: <LinkIcon />, title: 'You have given access', value: '05' },
    { icon: <CaptiveIcon type={'default'} />, title: 'Published', value: '06' }
  ]
];

export const Default: SelectStory = {
  render: () => <WithSource groups={GROUPS} icon={ICON} placeholder={'Filter'} />
};

function WithSource(props: Omit<TSelectProps, 'defaultOption' | 'onSelected' | 'selected'>) {
  const [selected, setSelected] = useState<null | number>(null);

  const onSelected = (index: number) => setSelected(index);

  return <Select onSelected={onSelected} selected={selected} {...props} />;
}
