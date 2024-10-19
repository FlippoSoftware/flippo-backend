import Text from "../ui/Text";

import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta = {
  title: "UIKit/Text",
  component: Text,
  tags: ["autodocs"]
};

export default meta;

type TextStory = StoryObj<typeof Text>;

export const TextBold: TextStory = {
  args: {
    children: "Flippo",
    fontSize: 20,
    fontWeight: "Bold"
  }
};
