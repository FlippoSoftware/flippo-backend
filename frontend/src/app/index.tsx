import '@settings/styles/global.scss';
import { InitApp } from '@settings/init';
import { authRoute, callbackRoute, mainRoute } from '@settings/routing';
import { Route } from 'atomic-router-react';
import { createRoot } from 'react-dom/client';

import { default as AuthCallbackPage } from './auth/callback/page';
import { default as AuthPage } from './auth/page';
import { default as TestPage } from './page';

createRoot(document.getElementById('root')!).render(
  <InitApp>
    <Route route={mainRoute} view={TestPage} />
    <Route route={authRoute} view={AuthPage} />
    <Route route={callbackRoute} view={AuthCallbackPage} />
  </InitApp>
);
