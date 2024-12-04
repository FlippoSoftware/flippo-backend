import { AuthCallback } from '@modules/auth';

import st from './page.module.scss';

function Page() {
  return (
    <div className={st.page}>
      <AuthCallback />
    </div>
  );
}

export default Page;
