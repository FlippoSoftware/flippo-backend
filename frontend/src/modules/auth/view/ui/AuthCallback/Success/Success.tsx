import { SuccessIcon } from '@shared/icons';
import { Loader } from '@shared/ui/Loader';
import { useTranslation } from 'react-i18next';

import st from './Success.module.scss';

function Success() {
  const { t } = useTranslation('auth', { keyPrefix: 'oauthCallbackContent.done' });

  return (
    <div className={st.success}>
      <SuccessIcon type={'circle'} />
      <h1 className={st.title}>{t('title')}</h1>
      <span className={st.hint}>
        {t('hint')}
        <Loader loader={'dotsFade'} />
      </span>
    </div>
  );
}

export { Success };
