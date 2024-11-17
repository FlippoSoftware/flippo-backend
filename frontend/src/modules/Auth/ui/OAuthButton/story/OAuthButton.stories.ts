import OAuthButton from "../ui/OAuthButton";

import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta = {
  title: "Auth/ui/OAuthButton",
  component: OAuthButton,
  tags: ["autodocs"]
};

export default meta;

type OAuthButtonStory = StoryObj<typeof OAuthButton>;

export const OAuthButtonGoogle: OAuthButtonStory = {
  args: {
    provider: "google",
    as: "button"
  }
};

export const OAuthButtonVK: OAuthButtonStory = {
  args: {
    provider: "vkontakte"
  }
};
