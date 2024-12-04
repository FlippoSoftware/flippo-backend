'use client';

import { FadeTransition } from '@shared/ui/FadeTransition';
import { SizeTransition } from '@shared/ui/SizeTransition';
import { type JSX } from 'react';

import { OauthStatus } from '../../../models/oauthCallback.model';
import { useOauthCallback } from '../../../vm/useOauthCallback';
import st from '../../styles/Auth.module.scss';
import { Pending } from '../Pending/Pending';
import { Fail } from './Fail/Fail';
import { Success } from './Success/Success';

const CONTENT_MAP: { [key in OauthStatus]: JSX.Element } = {
  [OauthStatus.Fail]: <Fail />,
  [OauthStatus.Pending]: <Pending />,
  [OauthStatus.Success]: <Success />
};

const STATUS_KEYS: { [key in OauthStatus]: string } = {
  [OauthStatus.Fail]: 'auth-callback-fail',
  [OauthStatus.Pending]: 'auth-callback-pending',
  [OauthStatus.Success]: 'auth-callback-success'
};

function AuthCallback() {
  const { oauthCallbackStatus } = useOauthCallback();

  const selectedContent = CONTENT_MAP[oauthCallbackStatus];

  return (
    <SizeTransition className={st.modal}>
      <FadeTransition className={st.content} contentKey={STATUS_KEYS[oauthCallbackStatus]}>
        {selectedContent}
      </FadeTransition>
    </SizeTransition>
  );
}

export default AuthCallback;
