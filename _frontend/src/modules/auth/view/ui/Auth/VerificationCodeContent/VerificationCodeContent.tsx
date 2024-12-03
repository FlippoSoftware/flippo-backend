'use client';

import { ArrowIcon } from '@shared/icons';
import { EmailIcon } from '@shared/icons';
import { Button, LoadingButton } from '@shared/ui/Button';
import { InputVerificationCode } from '@shared/ui/Input';
import { Link } from '@shared/ui/Link';
import { Separator } from '@shared/ui/Separator';
import { useTranslation } from 'react-i18next';

import { useVerificationCode } from '../../../../vm/useVerificationCode';
import st from './VerificationCodeContent.module.scss';

function VerificationCodeContent() {
  const {
    email,
    emailProvider,
    modalDisabled,
    onModalToAuthorizationMethod,
    onResendCode,
    onVerificationCodeChanged,
    onVerificationCodeSubmitted,
    requestCodeProcess,
    resendCodeDisabled,
    timer,
    timeView,
    verificationCodeError,
    verifyInputRef
  } = useVerificationCode();
  const { t } = useTranslation('auth', { keyPrefix: 'verificationCodeContent' });

  return (
    <div className={st.contentWrapper}>
      <div className={st.header}>
        <div className={st.textBlock}>
          <h1 className={st.title}>{t('title')}</h1>
          <p className={st.hint}>{t('hint')}</p>
        </div>
        <div className={st.emailBlock}>
          {emailProvider ? (
            <Link
              href={emailProvider.redirectURL}
              icon={<EmailIcon type={emailProvider.name} />}
              rel={'noopener noreferrer'}
              target={'_blank'}
              variant={'neutral'}
            >
              {email}
            </Link>
          ) : (
            <div>
              <span>{email}</span>
            </div>
          )}
        </div>
      </div>
      <div className={st.verifyBlock}>
        <InputVerificationCode
          inputSlotProps={{ disabled: modalDisabled }}
          invalid={!!verificationCodeError}
          length={5}
          onChange={onVerificationCodeChanged}
          onCompleted={onVerificationCodeSubmitted}
          placeholder={''}
          ref={verifyInputRef}
        />
        <LoadingButton
          disabled={modalDisabled || resendCodeDisabled}
          isLoading={requestCodeProcess}
          onClick={onResendCode}
          size={'small'}
          variant={'label'}
        >
          {t('verificationCode.buttonResendCode') +
            (timer
              ? timeView.minutes !== 0
                ? ` ${timeView.minutes}:${timeView.seconds < 10 ? `0${timeView.seconds}` : timeView.seconds} ${t('verificationCode.time.minutes')}`
                : ` ${timeView.seconds < 10 ? `0${timeView.seconds}` : timeView.seconds} ${t('verificationCode.time.minutes')}`
              : '')}
        </LoadingButton>
      </div>
      <Separator orientation={'horizontal'} />
      <Button
        as={'button'}
        className={st.backButton}
        disabled={modalDisabled}
        iconLeft={<ArrowIcon />}
        onClick={onModalToAuthorizationMethod}
        size={'large'}
        variant={'label'}
      >
        {t('buttonAnotherWayToLogIn')}
      </Button>
    </div>
  );
}

export default VerificationCodeContent;
