import { type Meta, type StoryObj } from '@storybook/react';
import { useState } from 'react';

import { type TLanguageSwitchProps } from '../types/TLanguageSwitchProps';
import { default as LanguageSwitch } from '../ui/LanguageSwitch';

const meta: Meta<TLanguageSwitchProps> = {
  argTypes: {
    language: { control: false, description: 'Current language. ("ru" or "en")', options: ['ru', 'en'] },
    onLanguageSwitch: { control: false, description: 'Language changing function', type: 'function' }
  },
  component: LanguageSwitch,
  title: 'Modules/Header/ui/LanguageSwitch'
};

export default meta;

type LanguageSwitchStory = StoryObj<typeof LanguageSwitch>;

export const Default: LanguageSwitchStory = {
  render: () => <WithChangeLanguage />
};

function WithChangeLanguage() {
  const [language, setLanguage] = useState('ru');
  const changeLanguage = () => {
    setLanguage((prev) => (prev === 'ru' ? 'en' : 'ru'));
  };

  return <LanguageSwitch language={language} onLanguageSwitch={changeLanguage} />;
}
