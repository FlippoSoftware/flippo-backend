import { Loader } from '@shared/ui/Loader';

import st from './Pending.module.scss';

function Pending() {
  return (
    <div className={st.pending}>
      <Loader className={st.loader} loader={'spinner'} />
    </div>
  );
}

export { Pending };
