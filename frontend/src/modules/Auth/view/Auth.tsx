"use client";

import { useEffect, useRef, useState } from "react";
import { clsx } from "clsx";

import st from "./Auth.module.scss";
import AuthMainContent from "./content/AuthMainContent/AuthMainContent";
import AuthVerifyCodeContent from "./content/AuthVerifyCodeContent/AuthVerifyCodeContent";
import AuthCallbackContent from "./content/AuthCallbackContent/AuthCallbackContent";
import AuthInputUsernameContent from "./content/AuthInputUsernameContent/AuthInputUsernameContent";

import type { TAuthProps } from "../types/TAuthProps";
import type { TState } from "../types/TState";

function Auth(props: TAuthProps) {
  const { type } = props;
  const [kind, setKind] = useState(type);

  const authRef = useRef<HTMLDivElement>(null);

  useEffect(() => {}, [authRef]);

  const changeState = (state: TState) => {
    setKind(state);
  };

  return (
    <div ref={authRef} className={st.modal}>
      <div className={clsx(st.content)}>
        {
          {
            main: <AuthMainContent changeState={changeState} />,
            callback: <AuthCallbackContent changeState={changeState} />,
            verifyCode: <AuthVerifyCodeContent changeState={changeState} />,
            inputUsername: <AuthInputUsernameContent changeState={changeState} />
          }[kind]
        }
      </div>
    </div>
  );
}

export default Auth;
