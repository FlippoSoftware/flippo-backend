import { Button } from '@shared/ui/Button';
import { StoryCombine, type TStoryCombineProps } from '@shared/ui/StoryCombine';
import { type Meta, type StoryObj } from '@storybook/react';
import { createEvent, fork, sample, scopeBind } from 'effector';
import { Provider } from 'effector-react';

import { $authContent, $authEmail } from '../models/auth.model';
import { type TAuthContent } from '../types/TAuthContent';
import { default as Auth } from '../view/ui/Auth/Auth';
import st from './Decorator.module.scss';

const meta: Meta = {
  component: Auth,
  title: 'Modules/Auth/Auth'
};

export default meta;

type AuthStory = StoryObj<typeof Auth>;

export const AuthMethod: AuthStory = {
  render: () => <WithVariant variant={'authorizationMethod'} />
};

export const AuthCode: AuthStory = {
  render: () => <StoryCombine {...CODE_GROUPS} />
};

const CODE_GROUPS: TStoryCombineProps<{ email: string } & { variant: TAuthContent }> = {
  args: {
    variant: 'verificationCode'
  },
  component: WithEmail,
  groups: [
    {
      name: 'Verification code content',
      variants: [
        { components: [{ email: '20vinipuh02@gmail.com' }], name: 'Familiar email provider' },
        { components: [{ email: 'flippo.verify.code@flippo.com' }], name: 'Unknown email provider' }
      ]
    }
  ]
};

export const AuthUsername: AuthStory = {
  render: () => <WithVariant variant={'inputUsername'} />
};

export const AuthSwap: AuthStory = {
  parameters: {
    layout: 'none'
  },
  render: () => {
    const scope = fork({
      values: [
        [$authContent, 'authorizationMethod'],
        [$authEmail, '20vinipuh02@gmail.com']
      ]
    });

    const changeContent = createEvent<Exclude<TAuthContent, 'oauthCallback'>>();
    const pushContent = scopeBind(changeContent, { scope });

    sample({
      clock: changeContent,
      target: $authContent
    });

    return (
      <Provider value={scope}>
        <div className={st.manipulationContainer}>
          <div className={st.experimentalContainer}>
            <div className={st.experimental}>
              <Auth />
            </div>
          </div>
          <div className={st.switches}>
            <Button onClick={() => pushContent('authorizationMethod')} size={'small'} variant={'primary'}>
              {'Authorization method'}
            </Button>
            <Button onClick={() => pushContent('verificationCode')} size={'small'} variant={'primary'}>
              {'Verification code'}
            </Button>
            <Button onClick={() => pushContent('inputUsername')} size={'small'} variant={'primary'}>
              {'Input username'}
            </Button>
          </div>
        </div>
      </Provider>
    );
  }
};

function WithVariant(props: { variant: TAuthContent }) {
  const { variant } = props;

  const scopeStory = fork({
    values: [[$authContent, variant]]
  });

  return (
    <Provider value={scopeStory}>
      <Auth />
    </Provider>
  );
}

function WithEmail(props: { email: string } & { variant: TAuthContent }) {
  const { email, variant } = props;

  const scopeStory = fork({
    values: [
      [$authEmail, email],
      [$authContent, variant]
    ]
  });

  return (
    <Provider value={scopeStory}>
      <Auth />
    </Provider>
  );
}
