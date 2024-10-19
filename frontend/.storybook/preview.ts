import type { Preview } from "@storybook/react";
import FlippoTheme from "./FlippoTheme";

import "../src/settings/styles/global.scss";

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
  }
};

export default preview;
