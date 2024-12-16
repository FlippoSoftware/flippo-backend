import { LogoutIcon, SettingsIcon } from '@shared/icons';
import { Item } from '@shared/ui/Item';
import { Menu, MenuHandler, MenuItem, MenuList } from '@shared/ui/Menu';
import { Separator } from '@shared/ui/Separator';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { LanguageSwitch } from '../../LanguageSwitch';
import { type TProfileButtonProps } from '../types/TProfileButtonProps';
import st from './ProfileButton.module.scss';

function ProfileButton(props: TProfileButtonProps) {
  const { avatar, language, onLanguageSwitch, onLogout, onSettings, username } = props;
  const { t } = useTranslation('header', { keyPrefix: 'profileButton' });

  return (
    <Menu offset={12} placement={'top-start'}>
      <MenuHandler>
        <button className={st.profileButton}>
          <img src={avatar || '../../../../../../public/profile_avatar.webp'} />
          <span>{username}</span>
        </button>
      </MenuHandler>
      <MenuList>
        <div className={st.languageSwitch}>
          <span id={'language-switch'}>{t('switchLabel')}</span>
          <LanguageSwitch
            aria-labelledby={'language-switch'}
            language={language || 'en'}
            onLanguageSwitch={onLanguageSwitch}
          />
        </div>
        <Separator orientation={'horizontal'} spacing={'spacing-6'} />
        <MenuItem onClick={onSettings}>
          <Item icon={<SettingsIcon />} title={t('settingsItem')} />
        </MenuItem>
        <MenuItem onClick={onLogout}>
          <Item icon={<LogoutIcon />} title={t('logoutItem')} />
        </MenuItem>
      </MenuList>
    </Menu>
  );
}

export default memo(ProfileButton);
