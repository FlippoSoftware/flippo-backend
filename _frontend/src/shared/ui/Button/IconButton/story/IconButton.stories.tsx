import { AddIcon } from '@shared/icons';
import { StoryCombine, type TStoryCombineProps, type TVariantComponent } from '@shared/ui/StoryCombine';
import { type Meta, type StoryObj } from '@storybook/react';

import { type TIconButtonProps } from '../types/TIconButtonProps';
import { default as IconButton } from '../ui/IconButton';

const ARGS: Partial<TIconButtonProps> = {
  children: <AddIcon type={'default'} />
};

const meta: Meta = {
  args: { ...ARGS, size: 'large' },
  argTypes: {
    children: { control: 'object' },
    disabled: { control: 'boolean' },
    size: { control: 'select', options: ['large', 'medium', 'small', 'x-small'] },
    variant: { control: 'select', options: ['label', 'outlined', 'primary', 'secondary'] }
  },
  component: IconButton,
  title: 'UIKit/Button/IconButton'
};

export default meta;

type ButtonStory = StoryObj<typeof IconButton>;

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

type TVariant = Omit<TVariantComponent<TIconButtonProps>, 'components'>;

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

const COMPONENTS: Partial<TIconButtonProps>[] = [{}, { disabled: true }];

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

const GROUPS: TStoryCombineProps<TIconButtonProps> = {
  args: ARGS,
  component: IconButton,
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
        size: 'medium'
      },
      name: 'Medium',
      variants: VARIANTS
    },
    {
      groupArgs: {
        size: 'small'
      },
      name: 'Small',
      variants: VARIANTS
    },
    {
      groupArgs: {
        size: 'x-small'
      },
      name: 'X-Small',
      variants: VARIANTS
    }
  ]
};
