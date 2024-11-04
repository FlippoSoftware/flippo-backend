import { Auth } from "@modules/Auth";
import { NextModal } from "@ui/Modal";

import st from "./page.module.scss";

function AuthPage() {
  return (
    <NextModal className={st.background}>
      <Auth type={"main"} />
    </NextModal>
  );
}

export default AuthPage;
