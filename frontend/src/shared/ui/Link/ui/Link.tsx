import clsx from "clsx";
import { ArrowIcon } from "@icons/ArrowIcon";

import { type TLinkProps } from "../type/TLinkProps";

import st from "./Link.module.scss";

function Link(props: TLinkProps) {
  const { icon, variant = "neutral", children, ...otherProps } = props;

  return (
    <a {...otherProps} className={st.anchor}>
      {icon ? <div className={st.icon}>{icon}</div> : null}
      <div className={clsx(st.text, st[variant])}>
        {children}
        <ArrowIcon type={"link"} />
      </div>
    </a>
  );
}

export default Link;
