"use client";

import { AnimatePresence, motion } from "framer-motion";
import useMeasure from "react-use-measure";

import { useAuth } from "../vm/hooks/useAuth";
import { type TAuthModalProps } from "../types/TAuthModalProps";

import st from "./ModalAuth.module.scss";
import AuthorizationMethodContent from "./AuthorizationMethodContent/AuthorizationMethodContent";
import VerificationCodeContent from "./VerificationCodeContent/VerificationCodeContent";
import OauthCallbackContent from "./OauthCallbackContent/OauthCallbackContent";
import InputUsernameContent from "./InputUsernameContent/InputUsernameContent";

const MODAL_PADDING = 32;

const CONTENT_MAP = {
  authorizationMethod: <AuthorizationMethodContent />,
  verificationCode: <VerificationCodeContent />,
  inputUsername: <InputUsernameContent />,
  oauthCallback: <OauthCallbackContent />
};

function Auth(props: TAuthModalProps) {
  const { type } = props;
  const { modalRef, modalContent } = useAuth();
  const [scope, { height }] = useMeasure();

  const selectedContent = CONTENT_MAP[type || modalContent];

  return (
    <motion.div
      initial={{ opacity: 0, y: "50vh" }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: "50vh" }}
      transition={{ duration: 0.3 }}
      className={st.popupWrapper}
    >
      <AnimatePresence>
        <motion.div
          ref={modalRef}
          tabIndex={-1}
          className={st.modal}
          animate={{ height: height + 2 * MODAL_PADDING }}
          transition={{ duration: 0 }}
        >
          <div ref={scope} className={st.content}>
            {selectedContent}
          </div>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}

export default Auth;
