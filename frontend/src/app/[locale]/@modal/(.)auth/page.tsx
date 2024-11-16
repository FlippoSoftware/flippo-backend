import { ModalAuth } from "@modules/Auth";
import { NextModal } from "@ui/Modal";

import st from "./page.module.scss";

function AuthPage() {
  return (
    <NextModal className={st.background}>
      <ModalAuth />
    </NextModal>
  );
}

export default AuthPage;
