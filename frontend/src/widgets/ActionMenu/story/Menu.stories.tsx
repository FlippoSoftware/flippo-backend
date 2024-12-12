import { BookMarkIcon, DeleteIcon, FolderIcon, LinkIcon, MoreIcon } from '@shared/icons';
import { IconButton } from '@shared/ui/Button';
import { MenuItem as CustomItem } from '@shared/ui/MenuItem';
import { Separator } from '@shared/ui/Separator';
import { type Meta, type StoryObj } from '@storybook/react';
import { type ComponentType } from 'react';

import { type TPlacement } from '../types/TMenuContextValue';
import { type TMenuProps } from '../types/TMenuProps';
import Menu from '../ui/Menu';
import { MenuContextProvider } from '../ui/MenuContext';
import MenuHandler from '../ui/MenuHandler';
import MenuItem from '../ui/MenuItem';
import MenuList from '../ui/MenuList';
import st from './Decorator.module.scss';

const meta: Meta<TMenuProps> = {
  argTypes: {
    animation: {
      control: false,
      description: 'The animation settings for the Menu component'
    },
    offset: { control: false, description: 'Menu indent from handler. Default 5px.' },
    placement: {
      control: 'radio',
      description: 'Menu placement relative to handler',
      options: [
        'top',
        'top-start',
        'top-end',
        'left',
        'left-start',
        'left-end',
        'right',
        'right-start',
        'right-end',
        'bottom',
        'bottom-start',
        'bottom-end'
      ]
    }
  },
  component: Menu,
  parameters: {
    docs: {
      description: {
        component:
          'The Menu is a complex component in which the menuHandler and MenuList components should be used, as well as for MenuList there is a MenuItem component in which there is a predefined logic for closing the menu when clicked.' +
          '\n MenuHandler accepts ReactElement as a child component, which will represent the menu opening element and relative to which the MenuList will be located.'
      }
    }
  },
  subcomponents: { MenuContextProvider, MenuHandler, MenuItem, MenuList } as { [key: string]: ComponentType<unknown> },
  title: 'Widgets/ActionMenu'
};

export default meta;

type MenuStory = StoryObj<typeof Menu>;

export const Default: MenuStory = {
  parameters: {
    controls: {
      disable: true
    }
  },
  render: () => <WithContent />,
  tags: ['!autodocs']
};

export const MenuPlacement: MenuStory = {
  parameters: {
    controls: {
      disable: true
    }
  },
  render: () => (
    <div className={st.grid}>
      <WithContent placement={'top'} />
      <WithContent placement={'top-start'} />
      <WithContent placement={'top-end'} />
      <WithContent placement={'left'} />
      <WithContent placement={'left-start'} />
      <WithContent placement={'left-end'} />
      <WithContent placement={'right'} />
      <WithContent placement={'right-start'} />
      <WithContent placement={'right-end'} />
      <WithContent placement={'bottom'} />
      <WithContent placement={'bottom-start'} />
      <WithContent placement={'bottom-end'} />
    </div>
  )
};

function WithContent({ className, placement }: { className?: string; placement?: TPlacement }) {
  return (
    <Menu placement={placement}>
      <MenuHandler>
        <div className={className} role={'presentation'} style={{ width: 'fit-content' }}>
          <IconButton size={'large'} variant={'outlined'}>
            <MoreIcon />
          </IconButton>
        </div>
      </MenuHandler>
      <MenuList>
        <MenuItem>
          <CustomItem icon={<LinkIcon />} onClick={() => {}} title={'Setting up access'} variant={'nonDestructive'} />
        </MenuItem>
        <MenuItem>
          <CustomItem icon={<FolderIcon />} onClick={() => {}} title={'Add to Folder'} variant={'nonDestructive'} />
        </MenuItem>
        <MenuItem>
          <CustomItem icon={<BookMarkIcon />} onClick={() => {}} title={'Create a copy'} variant={'nonDestructive'} />
        </MenuItem>
        <Separator orientation={'horizontal'} spacing={'spacing-6'} />
        <MenuItem>
          <CustomItem icon={<DeleteIcon />} onClick={() => {}} title={'Delete a set'} variant={'destructive'} />
        </MenuItem>
      </MenuList>
    </Menu>
  );
}
