"use client";

import { clsx } from "clsx";

import { useAuth } from "../vm/useAuth";

import st from "./Auth.module.scss";
import AuthorizationMethodContent from "./content/AuthorizationMethodContent/AuthorizationMethodContent";
import VerificationCodeContent from "./content/VerificationCodeContent/VerificationCodeContent";
import OauthCallbackContent from "./content/OauthCallbackContent/OauthCallbackContent";
import InputUsernameContent from "./content/InputUsernameContent/InputUsernameContent";

function Auth() {
  const { modalRef, modalContent, onModalAuthClose } = useAuth();

  return (
    <div ref={modalRef} className={st.modal}>
      <div className={clsx(st.content)}>
        {
          {
            authorizationMethod: <AuthorizationMethodContent />,
            verificationCode: <VerificationCodeContent />,
            inputUsername: <InputUsernameContent />,
            oauthCallback: <OauthCallbackContent />
          }[modalContent]
        }
      </div>
    </div>
  );
}

export default Auth;
