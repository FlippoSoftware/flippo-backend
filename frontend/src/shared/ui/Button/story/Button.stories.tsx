import { AddIcon } from "@icons/AddIcon";

import Button from "../Button/ui/Button";

import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta = {
  title: "UIKit/Button",
  component: Button,
  tags: ["autodocs"]
};

export default meta;

type ButtonStory = StoryObj<typeof Button>;

export const Primary: ButtonStory = {
  args: {
    icon: <AddIcon />,
    kind: "primary",
    size: "large",
    otherProps: { children: "Button" }
  }
};

export const PrimaryDisabled: ButtonStory = {
  args: {
    kind: "primary",
    size: "large",
    otherProps: { children: "Button", disabled: true }
  }
};

export const PrimaryFocused: ButtonStory = {
  args: {
    kind: "primary",
    size: "large",
    otherProps: { children: "Button", autofocus: true }
  }
};
