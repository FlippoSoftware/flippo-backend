'use client';

import { FadeTransition } from '@shared/ui/FadeTransition';
import { SizeTransition } from '@shared/ui/SizeTransition';
import { type JSX } from 'react';

import { type TAuthContent } from '../../../types/TAuthContent';
import { useAuth } from '../../../vm/useAuth';
import st from '../../styles/Auth.module.scss';
import AuthorizationMethodContent from './AuthorizationMethodContent/AuthorizationMethodContent';
import InputUsernameContent from './InputUsernameContent/InputUsernameContent';
import VerificationCodeContent from './VerificationCodeContent/VerificationCodeContent';

const CONTENT_MAP: { [key in TAuthContent]: JSX.Element } = {
  authorizationMethod: <AuthorizationMethodContent />,
  inputUsername: <InputUsernameContent />,
  verificationCode: <VerificationCodeContent />
};

const CONTENT_KEYS: { [key in TAuthContent]: string } = {
  authorizationMethod: 'auth-method-content',
  inputUsername: 'auth-code-content',
  verificationCode: 'auth-callback-content'
};

function Auth() {
  const { authContent, modalRef } = useAuth();

  const selectedContent = CONTENT_MAP[authContent];

  return (
    <SizeTransition className={st.modal} ref={modalRef}>
      <FadeTransition className={st.content} contentKey={CONTENT_KEYS[authContent]}>
        {selectedContent}
      </FadeTransition>
    </SizeTransition>
  );
}

export default Auth;
