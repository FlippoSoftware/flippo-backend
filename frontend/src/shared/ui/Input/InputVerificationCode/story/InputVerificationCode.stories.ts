import { default as InputVerificationCode } from "../ui/InputVerificationCode";

import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta = {
  title: "uikit/Input/InputVerificationCode",
  component: InputVerificationCode,
  tags: ["autodocs"]
};

export default meta;

type InputVerificationCodeStory = StoryObj<typeof InputVerificationCode>;

export const InputVerificationCodeDefault: InputVerificationCodeStory = {
  args: { length: 4 }
};
