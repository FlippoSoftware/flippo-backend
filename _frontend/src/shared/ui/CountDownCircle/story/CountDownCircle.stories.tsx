import { type Meta, type StoryObj } from '@storybook/react';

import { default as CountDownCircle } from '../ui/CountDownCircle';

const meta: Meta<typeof CountDownCircle> = {
  args: { size: 40 },
  argTypes: {
    className: { control: 'text', description: 'Additional CSS class names' },
    classNameEmptyBar: { control: 'text', description: 'CSS styles for the empty bar' },
    duration: { control: 'number', description: 'Number of milliseconds' },
    onComplete: { control: 'object', description: 'Function to call when countdown complete' },
    size: { control: 'number', description: 'Number of pixels' },
    strokeLinecap: {
      control: 'select',
      description: 'Shape of the end of the arc',
      options: ['butt', 'inherit', 'round', 'square', undefined]
    },
    strokeWidth: { control: 'number', description: 'Width of the arc stroke' }
  },
  component: CountDownCircle,
  title: 'UIKit/CountDownCircle'
};

export default meta;

type CountDownCircleStory = StoryObj<typeof CountDownCircle>;

export const Default: CountDownCircleStory = {
  args: {
    duration: 10000
  }
};
