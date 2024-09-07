import type { StorybookConfig } from "@storybook/nextjs";

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    "@storybook/addon-onboarding",
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@chromatic-com/storybook",
    "@storybook/addon-interactions",
    {
      name: "@storybook/addon-styling",
      options: { sass: { implementation: require("sass") } }
    }
  ],
  framework: {
    name: "@storybook/nextjs",
    options: { nextConfigPath: "../next.config.js" }
  },
  staticDirs: ["../public"]
};
export default config;
