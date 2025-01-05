import { SuccessIcon } from '@shared/icons';
import { Button } from '@shared/ui/Button';
import { Dialog } from '@shared/ui/Dialog';
import { FormInput } from '@shared/ui/Input';
import { createPortal } from 'react-dom';
import { useTranslation } from 'react-i18next';

import st from './NewFolderModal.module.scss';

function NewFolderModal() {
  const { t } = useTranslation('modal', { keyPrefix: 'createFolder' });

  return createPortal(
    <Dialog aria-labelledby={'title'} open>
      <div className={st.modal}>
        <div className={st.content}>
          <h3 id={'title'}>{t('title')}</h3>
          <FormInput errorMessage={''} placeholder={t('input.placeholder')} size={'large'} />
        </div>
        <div className={st.actions}>
          <Button size={'small'} variant={'secondary'}>
            {t('actions.cancel')}
          </Button>
          <Button iconLeft={<SuccessIcon type={'default'} />} size={'small'} variant={'primary'}>
            {t('actions.create')}
          </Button>
        </div>
      </div>
    </Dialog>,
    document.body
  );
}

export default NewFolderModal;
