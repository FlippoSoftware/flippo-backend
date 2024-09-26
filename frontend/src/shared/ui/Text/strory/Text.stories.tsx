import { Text } from "@atoms/Text";

import { Meta, StoryObj } from "@storybook/react";

const meta: Meta = {
  title: "Atoms/Text",
  component: Text,
  tags: ["autodocs"]
};

export default meta;

type TextStory = StoryObj<typeof Text>;

export const TextBody: TextStory = {
  args: {
    children: "Flippo",
    fontSize: 20,
    fontWeight: "Bold"
  }
};
