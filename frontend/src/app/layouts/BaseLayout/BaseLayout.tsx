import Header from '@modules/header';
import { type ReactNode } from 'react';

import st from './BaseLayout.module.scss';

function BaseLayout({ children }: { children: ReactNode }) {
  return (
    <div className={st.layout}>
      <Header />
      <main>{children}</main>
    </div>
  );
}

export default BaseLayout;
