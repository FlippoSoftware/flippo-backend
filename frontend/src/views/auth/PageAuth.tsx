import { ModalAuth } from "@modules/Auth";

import st from "./PageAuth.module.scss";

function PageAuth() {
  return (
    <div className={st.page}>
      <ModalAuth />
    </div>
  );
}

export default PageAuth;
