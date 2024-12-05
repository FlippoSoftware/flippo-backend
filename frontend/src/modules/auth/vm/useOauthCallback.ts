import { useUnit } from 'effector-react';

import * as oauthCallBackModel from '../models/oauthCallback.model';

const useOauthCallback = () => {
  const [oauthCallbackStatus, errorMessage, onTryAgain, onCanceled] = useUnit([
    oauthCallBackModel.$oauthCallbackStatus,
    oauthCallBackModel.$errorMessage,
    oauthCallBackModel.tryAgain,
    oauthCallBackModel.canceled
  ]);

  return {
    errorMessage,
    oauthCallbackStatus,
    onCanceled,
    onTryAgain
  };
};

export { useOauthCallback };
