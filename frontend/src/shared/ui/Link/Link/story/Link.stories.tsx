import { AddIcon, EmailIcon } from '@shared/icons';
import { StoryCombine, type TGroup, type TStoryCombineProps } from '@shared/ui/StoryCombine';
import { type Meta, type StoryObj } from '@storybook/react';

import { type TLinkProps } from '../types/TLinkProps';
import { default as Link } from '../ui/Link';

const meta: Meta<typeof Link> = {
  argTypes: {
    children: { control: 'text', name: 'text (children prop)' },
    icon: { control: false, description: 'Icon to display on the left relative to the link.' },
    to: {
      control: false,
      description: 'The redirect address can be a string or an instance of RouteInstance.'
    },
    variant: { control: 'select', options: ['neutral', 'brand'] }
  },
  component: Link,
  parameters: {
    docs: {
      description: {
        component:
          'The component is a wrapper for Link from the atomic-router-react library (https://atomic-router.github.io/react/api/link.html ).'
      }
    }
  },
  title: 'UIKit/Link/Link'
};

export default meta;

type LinkStory = StoryObj<typeof meta>;

const COMMON_ARGS = {
  to: 'http://localhost:6006/?path=/story/uikit-link-link--link-story-combine'
};

const NEUTRAL_ARGS = {
  children: 'linkStory',
  variant: 'neutral',
  ...COMMON_ARGS
};

export const NeutralLink: LinkStory = {
  args: NEUTRAL_ARGS as TLinkProps<object>
};

export const NeutralLinkWithIcon: LinkStory = {
  args: { ...NEUTRAL_ARGS, icon: <AddIcon type={'default'} /> } as TLinkProps<object>
};

const BRAND_ARGS = {
  children: 'linkStory',
  variant: 'brand',
  ...COMMON_ARGS
};

export const BrandLink: LinkStory = {
  args: BRAND_ARGS as TLinkProps<object>
};

export const BrandLinkWithIcon: LinkStory = {
  args: { ...BRAND_ARGS, icon: <AddIcon type={'default'} /> } as TLinkProps<object>
};

export const BrandLinkWithEmailLogo: LinkStory = {
  args: { ...BRAND_ARGS, icon: <EmailIcon type={'gmail'} /> } as TLinkProps<object>
};

export const LinkStoryCombine: LinkStory = {
  render: () => <StoryCombine {...GROUPS} />
};

const VARIANTS: TGroup<TLinkProps<object>>['variants'] = [
  { components: [{}], name: 'Default' },
  { components: [{ icon: <AddIcon type={'default'} /> }], name: 'With an icon' },
  { components: [{ icon: <EmailIcon type={'gmail'} /> }], name: 'With an icon with a built-in fill' }
];

const GROUPS: TStoryCombineProps<TLinkProps<object>> = {
  args: { children: 'Link', to: 'http://localhost:6006/?path=/story/uikit-link-link--link-story-combine' },
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
