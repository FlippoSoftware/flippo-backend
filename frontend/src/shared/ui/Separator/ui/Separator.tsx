import clsx from "clsx";

import { type TSeparatorProps } from "../types/TSeparatorProps";

import st from "./Separator.module.scss";

function Separator(props: TSeparatorProps) {
  const { orientation = "horizontal", spacing } = props;

  return (
    <div className={clsx(st.separatorWrap, st[orientation], !!spacing && st[spacing])}>
      <hr className={st.separator} />
    </div>
  );
}

export default Separator;
