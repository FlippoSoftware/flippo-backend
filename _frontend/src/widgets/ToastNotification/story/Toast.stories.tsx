import { type Meta, type StoryObj } from '@storybook/react';
import { StoryCombine, type TGroup, type TStoryCombineProps } from '@ui/StoryCombine';

import { type TToastProps } from '../types/TToastProps';
import { default as Toast } from '../ui/Toast';

const meta: Meta<TToastProps> = {
  args: {
    id: 'story-toast-id'
  },
  argTypes: {
    message: { control: 'text', description: 'Displayed text' },
    onAutomaticClosingAction: {
      action: 'onAutomaticClosingAction',
      description: 'Actions that are performed when the timeout expires'
    },
    onClickButtonClose: { action: 'onClickButtonClose', description: 'Action when the close button is pressed' },
    onClickContent: {
      action: 'onClickContent',
      description:
        'Action when clicking on the content inside the notification (After calling this action, the close notification action will be called)'
    },
    onClose: {
      action: 'onClose',
      description: 'The prop for closing the notification is used by the ToastContainer component'
    },
    statusIconSize: { control: 'number', description: 'The size of the status icon' },
    timeout: { control: 'number', description: 'The number of seconds until the notification is deleted' },
    variant: {
      control: 'select',
      description: 'Type of notification',
      options: ['success', 'warning', 'error', 'timer']
    }
  },
  component: Toast,
  title: 'Widgets/Toast'
};

export default meta;

type ToastStory = StoryObj<typeof Toast>;

export const ToastSuccess: ToastStory = {
  args: {
    message: 'Toast success message',
    variant: 'success'
  }
};

export const ToastWarning: ToastStory = {
  args: {
    message: 'Toast warning message',
    variant: 'warning'
  }
};

export const ToastError: ToastStory = {
  args: {
    message: 'Toast error message',
    variant: 'error'
  }
};

export const ToastTimer: ToastStory = {
  args: {
    message: 'Toast timer message',
    variant: 'timer'
  }
};

export const ToastStoryCombine: ToastStory = {
  render: () => <StoryCombine {...GROUPS} />
};

const VARIANTS: TGroup<TToastProps>['variants'] = [
  { components: [{ message: 'Adipisicing nulla amet enim eiusmod do.' }], name: 'Line text' },
  {
    components: [
      {
        message:
          'Veniam ad cupidatat fugiat excepteur reprehenderit aute ea laborum ea. Consequat adipisicing ullamco nulla minim eiusmod dolore dolore. Lorem dolor cupidatat laboris veniam do velit id labore.'
      }
    ],
    name: 'Multiline text'
  }
];

const GROUPS: TStoryCombineProps<TToastProps> = {
  component: Toast,
  groups: [
    { groupArgs: { variant: 'success' }, name: 'Success', variants: VARIANTS },
    { groupArgs: { variant: 'warning' }, name: 'Warning', variants: VARIANTS },
    { groupArgs: { variant: 'error' }, name: 'Error', variants: VARIANTS },
    { groupArgs: { variant: 'timer' }, name: 'Timer', variants: VARIANTS }
  ]
};
