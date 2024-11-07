import { Auth } from "@modules/Auth";

import st from "./PageAuth.module.scss";

function PageAuth() {
  return (
    <div className={st.page}>
      <Auth type={"authorizationMethod"} />
    </div>
  );
}

export default PageAuth;
