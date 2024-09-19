import { create } from "@storybook/theming/create";

export default create({
  base: "dark",

  // Typography
  fontBase: "VelaSans",
  fontCode: "monospace",

  brandTitle: "Flippo",
  brandUrl: "https://example.com",
  brandImage: "https://storybook.js.org/images/placeholders/350x150.png",
  brandTarget: "_self",

  // Brand
  colorPrimary: "#9265ed",
  colorSecondary: "#9265ed",

  // UI
  appBg: "#14151a",
  appContentBg: "#181a1f",
  appBorderColor: "#25262e",
  appBorderRadius: 16,

  // Text colors
  textColor: "#ffffff",
  textInverseColor: "#9265ed",

  // Toolbar default and active colors
  barTextColor: "#ffffff",
  barSelectedColor: "#9265ed",
  barBg: "#1d1e24",

  // Form colors
  inputBg: "#1d1e24",
  inputBorder: "#472f4d",
  inputTextColor: "#ffffff",
  inputBorderRadius: 0,
  buttonBg: "#0a0b0d"
});
