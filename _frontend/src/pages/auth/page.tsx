import { Auth } from '@modules/auth';

import st from './page.module.scss';

function Page() {
  return (
    <div className={st.page}>
      <Auth />
    </div>
  );
}

export default Page;
