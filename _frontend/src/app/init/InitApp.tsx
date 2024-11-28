import { $i18n } from '@settings/i18next/i18next.config';
import { ToastContainer } from '@widgets/ToastNotification';
import { useUnit } from 'effector-react';
import { type i18n } from 'i18next';
import { type PropsWithChildren, useEffect } from 'react';
import { I18nextProvider } from 'react-i18next';

import { $initialized, initApp, teardownApp } from './models/app.model';

function InitApp(props: PropsWithChildren<object>) {
  const { children } = props;
  const [initialized, initAppEvent, teardownAppEvent, i18n] = useUnit([$initialized, initApp, teardownApp, $i18n]);

  useEffect(() => {
    initAppEvent();

    return () => {
      teardownAppEvent();
    };
  }, [initAppEvent, teardownAppEvent]);

  if (!initialized) {
    return <p style={{ color: 'white', fontSize: '40px' }}>{'loading'}</p>;
  }

  return (
    <I18nextProvider i18n={i18n as i18n}>
      {children}
      <ToastContainer toastCountOnScreen={4} />
    </I18nextProvider>
  );
}

export default InitApp;
