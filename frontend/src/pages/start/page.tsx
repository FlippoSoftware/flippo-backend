import { Loader } from '@shared/ui/Loader';

import st from './Page.module.scss';

function Page() {
  return (
    <div className={st.page}>
      <h1>{'Flippo'}</h1>
      <Loader loader={'spinner'} />
    </div>
  );
}

export default Page;
