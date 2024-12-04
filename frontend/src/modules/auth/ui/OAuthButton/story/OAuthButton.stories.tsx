import type { Meta, StoryObj } from '@storybook/react';

import { StoryCombine, type TStoryCombineProps } from '@shared/ui/StoryCombine';
import { useTranslation } from 'react-i18next';

import { type TOAuthButtonProps } from '../types/TOAuthButtonProps';
import OAuthButton from '../ui/OAuthButton';
import st from './Decorator.module.scss';

const meta: Meta<TOAuthButtonProps> = {
  argTypes: {
    provider: {
      control: 'select',
      options: ['google', 'vkontakte', 'yandex']
    }
  },
  component: OAuthButtonWithTranslation,
  parameters: {
    docs: {
      description: {
        component: 'The button to switch to OAuth authorization'
      }
    }
  },
  title: 'Modules/Auth/ui/OAuthButton'
};

export default meta;

type OAuthButtonStory = StoryObj<typeof OAuthButtonWithTranslation>;

export const OAuthButtonGoogle: OAuthButtonStory = {
  args: {
    provider: 'google'
  },
  decorators: Decorator
};

export const OAuthButtonVK: OAuthButtonStory = {
  args: {
    provider: 'vkontakte'
  },
  decorators: Decorator
};

export const OAuthButtonYandex: OAuthButtonStory = {
  args: {
    provider: 'yandexID'
  },
  decorators: Decorator
};

export const OAuthStoryCombine: OAuthButtonStory = {
  render: () => <StoryCombine {...GROUPS} />
};

const GROUPS: TStoryCombineProps<TOAuthButtonProps> = {
  component: OAuthButtonWithTranslation,
  decorator: (story) => <div className={st.decorator}>{story}</div>,
  groups: [
    {
      name: 'Providers',
      variants: [
        { components: [{ provider: 'google' }], name: 'Google' },
        { components: [{ provider: 'vkontakte' }], name: 'Vkontakte' },
        { components: [{ provider: 'yandexID' }], name: 'Yandex ID' }
      ]
    }
  ]
};

function Decorator(Story: any) {
  return (
    <div className={st.decorator}>
      <Story />
    </div>
  );
}

function OAuthButtonWithTranslation(props: TOAuthButtonProps) {
  const { provider } = props;
  const { t } = useTranslation('auth', { keyPrefix: 'authorizationMethodContent.oauth.buttonOauth' });

  return <OAuthButton {...props}>{t(provider as any)}</OAuthButton>;
}
