import { AddIcon } from '@icons/AddIcon';
import { type Meta, type StoryObj } from '@storybook/react';
import { StoryCombine, type TStoryCombineProps, type TVariantComponent } from '@ui/StoryCombine';

import { type TLoadingButtonProps } from '../types/TLoadingButtonProps';
import { default as LoadingButton } from '../ui/LoadingButton';

const ARGS: Partial<TLoadingButtonProps> = {
  as: 'button',
  children: 'Button',
  iconLeft: <AddIcon type={'default'} />,
  isLoading: true
};

const meta: Meta = {
  args: { ...ARGS, size: 'large' },
  argTypes: {
    children: { control: 'text', name: 'text (children prop)' },
    disabled: { control: 'boolean' },
    isLoading: { control: 'boolean' },
    loader: { control: 'select', options: ['spinner'] },
    size: { control: 'select', options: ['small', 'large'] },
    variant: { control: 'select', options: ['label', 'outlined', 'primary', 'secondary'] }
  },
  component: LoadingButton,
  title: 'UIKit/Button/LoadingButton'
};

export default meta;

type ButtonStory = StoryObj<typeof LoadingButton>;

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

type TVariant = Omit<TVariantComponent<TLoadingButtonProps>, 'components'>;

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

const COMPONENTS: Partial<TLoadingButtonProps>[] = [
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

const GROUPS: TStoryCombineProps<TLoadingButtonProps> = {
  args: ARGS,
  component: LoadingButton,
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
