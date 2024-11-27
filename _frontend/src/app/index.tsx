import '../settings/styles/global.scss';

import { createRoot } from 'react-dom/client';

import { default as InitApp } from './init/InitApp';
import { default as TestPage } from './page';

createRoot(document.getElementById('root')!).render(
  <InitApp>
    <TestPage />
  </InitApp>
);
