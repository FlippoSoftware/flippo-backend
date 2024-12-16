import { $language, changeLanguageFx } from '@settings/i18next';
import { type Meta, type StoryObj } from '@storybook/react';
import { useUnit } from 'effector-react';

import { type TProfileButtonProps } from '../types/TProfileButtonProps';
import { default as ProfileButton } from '../ui/ProfileButton';

const meta: Meta<TProfileButtonProps> = {
  argTypes: {
    avatar: { control: 'text', description: "URL of the user's avatar" },
    language: { control: false, description: 'Current language' },
    onLanguageSwitch: { control: false, description: 'Language change function', type: 'function' },
    onLogout: { control: false, description: 'Account logout function', type: 'function' },
    onSettings: { control: false, description: 'The function of switching to settings', type: 'function' },
    username: { control: 'text', description: 'Name of the current user' }
  },
  component: ProfileButton,
  title: 'Modules/Header/ui/ProfileButton'
};

export default meta;

type ProfileButtonStory = StoryObj<typeof ProfileButton>;

export const Default: ProfileButtonStory = {
  render: () => <WithProps />
};

function WithProps() {
  const [language, changeLanguage] = useUnit([$language, changeLanguageFx]);

  const onChangeLanguage = () => {
    changeLanguage(language === 'ru' ? 'en' : 'ru').catch(() => console.log('Failed switched'));
  };

  return (
    <ProfileButton
      avatar={
        'https://sun2-20.userapi.com/impg/CkWKZcMUKKMbth_9d9NuJuQFjdCmAQwgYs5unw/S_pymG0DSiE.jpg?size=1055x1280&quality=95&sign=63fcbb86259de04e38caad096bb671e3&type=album'
      }
      language={language || 'en'}
      onLanguageSwitch={onChangeLanguage}
      onLogout={() => console.log('Logout')}
      onSettings={() => console.log('Redirect to Settings')}
      username={'Егор Горочкин'}
    />
  );
}
