import { addons } from '@storybook/manager-api';

import customTheme from './customTheme';

// eslint-disable-next-line @typescript-eslint/no-unsafe-call
addons.setConfig({
  theme: customTheme //themes.dark
});
