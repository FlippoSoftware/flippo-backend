import { type Meta, type StoryObj } from "@storybook/react";

import { default as Link } from "../ui/Link";

const meta: Meta<typeof Link> = {
  title: "UIKit/Link",
  component: Link,
  tags: ["autodocs"]
};

export default meta;

type LinkStory = StoryObj<typeof meta>;

export const NeutralLink: LinkStory = {
  args: {
    href: "#",
    children: "linkStory",
    variant: "neutral"
  }
};

export const BrandLink: LinkStory = {
  args: {
    href: "#",
    children: "linkStory",
    variant: "brand"
  }
};
