'use client';

import { authProviders, type TAuthProvider } from '@shared/query';
import { LoadingButton } from '@shared/ui/Button';
import { FormInput } from '@shared/ui/Input';
import { Loader } from '@shared/ui/Loader';
import { Separator } from '@shared/ui/Separator';
import { clsx } from 'clsx';
import { type ChangeEvent } from 'react';
import { Trans, useTranslation } from 'react-i18next';

import OAuthButton from '../../../../ui/OAuthButton/ui/OAuthButton';
import { useAuthorizationMethod } from '../../../../vm/useAuthorizationMethod';
import st from './AuthorizationMethodContent.module.scss';

function AuthorizationMethodContent() {
  const {
    contentDisabled,
    emailInput,
    emailInputError,
    emailInputRef,
    emailPending,
    onEmailInputBlur,
    onEmailInputChanged,
    onEmailSubmitted,
    onOauthRedirect,
    redirectPending
  } = useAuthorizationMethod();
  const { t } = useTranslation('auth', { keyPrefix: 'authorizationMethodContent' });

  return (
    <div className={st.contentWrapper}>
      <div className={st.header}>
        <h1 className={st.title}>
          <Trans i18nKey={'title'} t={t}>
            {'Welcome to '}
            <span className={st.flippo}>{'Flippo'}</span>
            {'!\r'}
          </Trans>
        </h1>
        <div className={clsx(st.status, redirectPending && st.showStatus)}>
          <Loader className={st.loader} loader={'spinner'} />
        </div>
      </div>

      <div className={st.buttonContainer}>
        {authProviders.map((provider: TAuthProvider) => (
          <OAuthButton
            disabled={contentDisabled}
            key={provider}
            onClick={() => onOauthRedirect(provider)}
            provider={provider}
          >
            {t(`oauth.buttonOauth.${provider}` as any) as string}
          </OAuthButton>
        ))}
      </div>
      <div className={st.separator}>
        <Separator orientation={'horizontal'} />
        <span>{t('separator')}</span>
        <Separator orientation={'horizontal'} />
      </div>
      <form
        className={clsx(st.emailForm, { [st.invalidEmailForm]: !!emailInputError })}
        onSubmit={(event) => {
          event.preventDefault();
          onEmailSubmitted();
        }}
      >
        <FormInput
          disabled={contentDisabled}
          errorMessage={emailInputError ? (t(`email.inputError.${emailInputError}` as any) as string) : null}
          id={'email'}
          name={'email'}
          onBlur={onEmailInputBlur}
          onChange={(event: ChangeEvent<HTMLInputElement>) => onEmailInputChanged(event.target.value)}
          placeholder={t('email.inputPlaceholder')}
          ref={emailInputRef}
          size={'large'}
          type={'text'}
          value={emailInput}
        />
        <LoadingButton disabled={contentDisabled} isLoading={emailPending} size={'large'} variant={'primary'}>
          {t('email.buttonSubmit')}
        </LoadingButton>
      </form>
    </div>
  );
}

export default AuthorizationMethodContent;
