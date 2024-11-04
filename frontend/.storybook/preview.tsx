import type { Preview } from "@storybook/react";
import FlippoTheme from "./FlippoTheme";
import defaultMessages from "../messages/ru.json";
import { NextIntlClientProvider } from "next-intl";

import "../src/settings/styles/global.scss";
import React from "react";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i
      }
    },
    docs: {
      theme: FlippoTheme
    }
  },
  decorators: [
    (Story) => (
      <NextIntlClientProvider locale='ru' messages={defaultMessages}>
        <Story />
      </NextIntlClientProvider>
    )
  ]
};

export default preview;
