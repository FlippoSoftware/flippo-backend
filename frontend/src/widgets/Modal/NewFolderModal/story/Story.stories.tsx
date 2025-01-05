import { type Meta, type StoryObj } from '@storybook/react';

import NewFolderModal from '../ui/NewFolderModal';

const meta: Meta = {
  component: NewFolderModal,
  title: 'Widgets/Modal/NewFolderModal'
};

export default meta;

type NewFolderModalStory = StoryObj<typeof NewFolderModal>;

export const Default: NewFolderModalStory = {
  parameters: {
    layout: ''
  }
};
