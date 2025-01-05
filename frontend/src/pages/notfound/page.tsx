import { Button } from '@shared/ui/Button';
import { Separator } from '@shared/ui/Separator';
import { useUnit } from 'effector-react';
import { useTranslation } from 'react-i18next';

import { redirectBack } from './model/page.model';
import st from './Page.module.scss';

function Page() {
  const redirect = useUnit(redirectBack);
  const { t } = useTranslation('notfound', { keyPrefix: 'baseOtherwise' });

  return (
    <div className={st.page}>
      <h1>
        {t('header')}
        <Separator orientation={'horizontal'} />
        <hgroup>{t('headerGroup')}</hgroup>
      </h1>
      <Button onClick={redirect} size={'large'} variant={'outlined'}>
        {t('mainButton')}
      </Button>
    </div>
  );
}

export default Page;
