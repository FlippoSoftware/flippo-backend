import type { Preview } from '@storybook/react';

import '../src/settings/styles/global.scss';

import { Suspense } from 'react';

import i18n from '../src/settings/i18next/i18next.config';

await i18n.init();

const preview: Preview = {
  decorators: (Story) => (
    <Suspense fallback={'Loading...'}>
      <Story />
    </Suspense>
  ),
  initialGlobals: {
    locale: 'ru',
    locales: {
      en: 'English',
      ru: 'Русский'
    }
  },
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i
      }
    },
    i18n: i18n,
    layout: 'centered'
  },
  tags: ['autodocs']
};

export default preview;
