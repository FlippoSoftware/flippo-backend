import { BookMarkIcon, DeleteIcon, FolderIcon, LinkIcon, MoreIcon } from '@shared/icons';
import { IconButton } from '@shared/ui/Button';
import { type Meta, type StoryObj } from '@storybook/react';
import clsx from 'clsx';
import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

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
    onClose: { control: false, description: 'Menu close function.' },
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
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [targetRec, setTargetRec] = useState<TActionMenuProps['targetRec']>({ bottom: 0, left: 0, right: 0, top: 0 });
  const buttonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (buttonRef.current) {
      const rec = buttonRef.current.getBoundingClientRect();
      setTargetRec({ bottom: rec.bottom, left: rec.left, right: rec.right, top: rec.top });
    }
  }, []);

  const onClickButton = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div className={clsx(props.className, st.button)} ref={buttonRef}>
        <IconButton onClick={onClickButton} size={'large'} variant={'outlined'}>
          <MoreIcon />
        </IconButton>
      </div>
      {isOpen
        ? createPortal(
            <ActionMenu groups={GROUPS} onClose={onClickButton} targetRec={targetRec} />,
            document.body,
            'menu'
          )
        : null}
    </>
  );
}
