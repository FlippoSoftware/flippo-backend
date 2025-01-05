import { ArrowIcon, ErrorIcon } from '@shared/icons';
import { Button } from '@shared/ui/Button';
import { useTranslation } from 'react-i18next';

import { useOauthCallback } from '../../../../vm/useOauthCallback';
import st from './Fail.module.scss';

function Fail() {
  const { errorMessage, onCanceled, onTryAgain } = useOauthCallback();
  const { t } = useTranslation('auth', { keyPrefix: 'oauthCallbackContent.fail' });

  return (
    <div className={st.error}>
      <div className={st.errorHeader}>
        <ErrorIcon type={'circle'} />
        <div>
          <h1 className={st.title}>{t('title')}</h1>
          <p className={st.errorMessage}>{`ERROR: ${t(`error.${errorMessage}` as any) as string}`}</p>
        </div>
      </div>
      <div className={st.buttonContainer}>
        <Button onClick={onTryAgain} size={'large'} variant={'primary'}>
          {t('buttonAgain')}
        </Button>
        <Button iconLeft={<ArrowIcon />} onClick={onCanceled} size={'large'} variant={'secondary'}>
          {t('buttonBack')}
        </Button>
      </div>
    </div>
  );
}

export { Fail };
