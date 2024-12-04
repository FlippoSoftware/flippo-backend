'use client';

import { LoadingButton } from '@shared/ui/Button';
import { FormInput } from '@shared/ui/Input';
import clsx from 'clsx';
import { type ChangeEvent } from 'react';
import { useTranslation } from 'react-i18next';

import { useInputUsername } from '../../../../vm/useInputUsername';
import st from './InputUsernameContent.module.scss';

function InputUsernameContent() {
  const { onUsernameInputChanged, onUsernameSubmitted, usernameInput, usernameInputError, usernameInputRef } =
    useInputUsername();
  const { t } = useTranslation('auth', { keyPrefix: 'inputUsernameContent' });

  return (
    <div className={st.contentWrapper}>
      <div className={st.header}>
        <h1 className={st.title}>{t('title')}</h1>
        <p className={st.hint}>{t('hint')}</p>
      </div>
      <form
        className={clsx(st.usernameForm, usernameInputError && st.invalidUsernameFrom)}
        onSubmit={(event) => {
          event.preventDefault();
          onUsernameSubmitted();
        }}
      >
        <FormInput
          errorMessage={usernameInputError ? (t(`inputError.${usernameInputError}` as any) as string) : null}
          id={'username'}
          name={'username'}
          onChange={(event: ChangeEvent<HTMLInputElement>) => onUsernameInputChanged(event.target.value)}
          placeholder={t('inputPlaceholder')}
          ref={usernameInputRef}
          size={'large'}
          type={'text'}
          value={usernameInput}
        />
        <LoadingButton isLoading={false} loader={'spinner'} size={'large'} variant={'primary'}>
          {t('buttonSubmit')}
        </LoadingButton>
      </form>
    </div>
  );
}

export default InputUsernameContent;
