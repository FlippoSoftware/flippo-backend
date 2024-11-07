"use client";

import { clsx } from "clsx";

import { useAuth } from "../vm/useAuth";
import { type TAuthModalProps } from "../types/TAuthModalProps";

import st from "./Auth.module.scss";
import AuthorizationMethodContent from "./content/AuthorizationMethodContent/AuthorizationMethodContent";
import VerificationCodeContent from "./content/VerificationCodeContent/VerificationCodeContent";
import OauthCallbackContent from "./content/OauthCallbackContent/OauthCallbackContent";
import InputUsernameContent from "./content/InputUsernameContent/InputUsernameContent";

function Auth(props: TAuthModalProps) {
  const { type } = props;
  const { modalRef, modalContent } = useAuth();

  return (
    <div ref={modalRef} tabIndex={-1} className={st.modal}>
      <div className={clsx(st.content)}>
        {
          {
            authorizationMethod: <AuthorizationMethodContent />,
            verificationCode: <VerificationCodeContent />,
            inputUsername: <InputUsernameContent />,
            oauthCallback: <OauthCallbackContent />
          }[type] //modalContent]
        }
      </div>
    </div>
  );
}

export default Auth;
