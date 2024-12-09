import { BookMarkIcon, DeleteIcon, FolderIcon, LinkIcon, MoreIcon } from '@shared/icons';
import { IconButton } from '@shared/ui/Button';
import { type Meta, type StoryObj } from '@storybook/react';

import { useActionMenu } from '../hooks/useActionMenu';
import { type TActionMenuProps } from '../types/TActionMenuProps';
import { default as ActionMenu } from '../ui/ActionMenu';
import st from './Decorator.module.scss';

const meta: Meta<TActionMenuProps> = {
  argTypes: {
    groups: {
      control: false,
      description:
        'Array of groups with arrays of menu items. Designed for semantic separation of items by a separator.'
    },
    id: {
      control: 'text',
      description: 'Id is an optional parameter that is used to bind to the menu opening button.'
    },
    //onClose: { control: false, description: 'Menu close function.' },
    targetRec: { control: false, description: 'Position of the opening menu object.' }
  },
  component: ActionMenu,
  parameters: {
    docs: {
      description: {
        component: 'The ActionMenu component is a component for displaying a menu with additional actions.'
      }
    }
  },
  title: 'Widgets/ActionMenu'
};

export default meta;

type ActionMenuStory = StoryObj<typeof ActionMenu>;

const GROUPS: TActionMenuProps['groups'] = [
  [
    { icon: <LinkIcon />, onClick: () => {}, title: 'Setting up access', variant: 'nonDestructive' },
    { icon: <FolderIcon />, onClick: () => {}, title: 'Add to Folder', variant: 'nonDestructive' },
    { icon: <BookMarkIcon />, onClick: () => {}, title: 'Create a copy', variant: 'nonDestructive' }
  ],
  [{ icon: <DeleteIcon />, onClick: () => {}, title: 'Delete a set', variant: 'destructive' }]
];

export const Default: ActionMenuStory = {
  args: {
    groups: GROUPS
  },
  decorators: (Story) => (
    <div className={st.offAbsolute}>
      <Story />
    </div>
  )
};

export const OpenButton: ActionMenuStory = {
  render: () => <WithOpenButton />,
  tags: ['!autodocs']
};

export const LocationOptions: ActionMenuStory = {
  render: () => (
    <div className={st.decorator}>
      <WithOpenButton className={st.left} />
      <WithOpenButton className={st.right} />
      <WithOpenButton className={st.top} />
      <WithOpenButton className={st.bottom} />
    </div>
  ),
  tags: ['!autodocs']
};

function WithOpenButton(props: { className?: string }) {
  const { menu, onMenuSwitched, source } = useActionMenu({ groups: GROUPS });

  return (
    <>
      <div onClick={onMenuSwitched} ref={source} style={{ width: 'fit-content' }}>
        <IconButton size={'large'} variant={'outlined'}>
          <MoreIcon />
        </IconButton>
      </div>
      {menu}
    </>

    // <ActionMenu groups={GROUPS}>
    //   <IconButton size={'large'} variant={'outlined'}>
    //     <MoreIcon />
    //   </IconButton>
    // </ActionMenu>
  );
}
