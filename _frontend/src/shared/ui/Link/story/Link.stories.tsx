import { AddIcon, EmailIcon } from '@icons/index';
import { type Meta, type StoryObj } from '@storybook/react';
import { StoryCombine, type TGroup, type TStoryCombineProps } from '@ui/StoryCombine';

import { type TLinkProps } from '../type/TLinkProps';
import { default as Link } from '../ui/Link';

const meta: Meta<typeof Link> = {
  argTypes: {
    children: { control: 'text', name: 'text (children prop)' },
    href: { control: 'text' },
    icon: { control: 'object' },
    variant: { control: 'select', options: ['neutral', 'brand'] }
  },
  component: Link,
  title: 'UIKit/Link/Link'
};

export default meta;

type LinkStory = StoryObj<typeof meta>;

const COMMON_ARGS = {
  href: '#'
};

const NEUTRAL_ARGS = {
  children: 'linkStory',
  variant: 'neutral',
  ...COMMON_ARGS
};

export const NeutralLink: LinkStory = {
  args: NEUTRAL_ARGS as TLinkProps
};

export const NeutralLinkWithIcon: LinkStory = {
  args: { ...NEUTRAL_ARGS, icon: <AddIcon type={'default'} /> } as TLinkProps
};

const BRAND_ARGS = {
  children: 'linkStory',
  variant: 'brand',
  ...COMMON_ARGS
};

export const BrandLink: LinkStory = {
  args: BRAND_ARGS as TLinkProps
};

export const BrandLinkWithIcon: LinkStory = {
  args: { ...BRAND_ARGS, icon: <AddIcon type={'default'} /> } as TLinkProps
};

export const BrandLinkWithEmailLogo: LinkStory = {
  args: { ...BRAND_ARGS, icon: <EmailIcon type={'gmail'} /> } as TLinkProps
};

export const LinkStoryCombine: LinkStory = {
  render: () => <StoryCombine {...GROUPS} />
};

const VARIANTS: TGroup<TLinkProps>['variants'] = [
  { components: [{}], name: 'Default' },
  { components: [{ icon: <AddIcon type={'default'} /> }], name: 'With an icon' },
  { components: [{ icon: <EmailIcon type={'gmail'} /> }], name: 'With an icon with a built-in fill' }
];

const GROUPS: TStoryCombineProps<TLinkProps> = {
  args: { children: 'Link' },
  component: Link,
  groups: [
    {
      groupArgs: {
        variant: 'neutral'
      },
      name: 'Neutral',
      variants: VARIANTS
    },
    {
      groupArgs: {
        variant: 'brand'
      },
      name: 'Brand',
      variants: VARIANTS
    }
  ]
};
