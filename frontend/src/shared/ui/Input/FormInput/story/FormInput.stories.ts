import { FormInput } from "@ui/Input";

import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta = {
  title: "UIKit/Input/FormInput",
  component: FormInput,
  tags: ["autodocs"]
};

export default meta;

type FormInputStory = StoryObj<typeof FormInput>;

export const FormInputEmail: FormInputStory = {
  args: {
    type: "email",
    placeholder: "@email"
  }
};
