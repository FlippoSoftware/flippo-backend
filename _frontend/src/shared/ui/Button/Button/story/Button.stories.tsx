import { AddIcon } from '@shared/icons';
import { StoryCombine, type TStoryCombineProps, type TVariantComponent } from '@shared/ui/StoryCombine';
import { type Meta, type StoryObj } from '@storybook/react';

import { type TButtonProps } from '../types/TButtonProps';
import { default as Button } from '../ui/Button';

const ARGS: Partial<TButtonProps<'button'>> = {
  as: 'button',
  children: 'Button',
  iconLeft: <AddIcon type={'default'} />
};

const meta: Meta = {
  args: { ...ARGS, size: 'large' },
  argTypes: {
    children: { control: 'text', name: 'text (children prop)' },
    disabled: { control: 'boolean' },
    size: { control: 'select', options: ['small', 'large'] },
    variant: { control: 'select', options: ['label', 'outlined', 'primary', 'secondary'] }
  },
  component: Button,
  title: 'UIKit/Button/Button'
};

export default meta;

type ButtonStory = StoryObj<typeof Button>;

export const PrimaryButton: ButtonStory = {
  args: {
    variant: 'primary'
  }
};

export const SecondaryButton: ButtonStory = {
  args: {
    variant: 'secondary'
  }
};

export const OutlinedButton: ButtonStory = {
  args: {
    variant: 'outlined'
  }
};

export const LabelButton: ButtonStory = {
  args: {
    variant: 'label'
  }
};

export const ButtonStoryCombine: ButtonStory = {
  render: () => <StoryCombine {...GROUPS} />
};

type TVariant = Omit<TVariantComponent<TButtonProps<'button'>>, 'components'>;

const VARIANT_SECONDARY: TVariant = {
  name: 'Secondary',
  variantArgs: {
    variant: 'secondary'
  }
};

const VARIANT_OUTLINED: TVariant = {
  name: 'Outlined',
  variantArgs: {
    variant: 'outlined'
  }
};

const VARIANT_LABEL: TVariant = {
  name: 'Label',
  variantArgs: {
    variant: 'label'
  }
};

const VARIANT_PRIMARY: TVariant = {
  name: 'Primary',
  variantArgs: {
    variant: 'primary'
  }
};

const COMPONENTS: Partial<TButtonProps<'button'>>[] = [
  {},
  { iconLeft: undefined },
  { disabled: true },
  { disabled: true, iconLeft: undefined }
];

const VARIANTS = [
  {
    components: COMPONENTS,
    ...VARIANT_PRIMARY
  },
  {
    components: COMPONENTS,
    ...VARIANT_SECONDARY
  },
  {
    components: COMPONENTS,
    ...VARIANT_OUTLINED
  },
  {
    components: COMPONENTS,
    ...VARIANT_LABEL
  }
];

const GROUPS: TStoryCombineProps<TButtonProps<'button'>> = {
  args: ARGS,
  component: Button,
  groups: [
    {
      groupArgs: {
        size: 'large'
      },
      name: 'Large',
      variants: VARIANTS
    },
    {
      groupArgs: {
        size: 'small'
      },
      name: 'Small',
      variants: VARIANTS
    }
  ]
};
