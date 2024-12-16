import type { Preview } from '@storybook/react';

import '../src/settings/styles/global.scss';

import { router } from '@settings/routing';
import { ToastContainer } from '@widgets/ToastNotification';
import { RouterProvider } from 'atomic-router-react';
import { Suspense } from 'react';

import { $i18n, initI18next } from '../src/settings/i18next/i18next.config';

initI18next();
// eslint-disable-next-line effector/no-getState
const i18n = $i18n.getState();

const preview: Preview = {
  decorators: (Story) => (
    <RouterProvider router={router}>
      <Suspense fallback={'Loading...'}>
        <Story />
        <ToastContainer toastCountOnScreen={4} />
      </Suspense>
    </RouterProvider>
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
