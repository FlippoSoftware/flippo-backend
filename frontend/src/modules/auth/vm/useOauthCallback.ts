import { useUnit } from 'effector-react';

import * as oauthCallBackModel from '../models/oauthCallback.model';

const useOauthCallback = () => {
  const [oauthCallbackStatus, errorMessage, onTryAgain, onPlaceBeforeAuthorization] = useUnit([
    oauthCallBackModel.$oauthCallbackStatus,
    oauthCallBackModel.$errorMessage,
    oauthCallBackModel.tryAgain,
    oauthCallBackModel.placeBeforeAuthorization
  ]);

  return {
    errorMessage,
    oauthCallbackStatus,
    onPlaceBeforeAuthorization,
    onTryAgain
  };
};

export { useOauthCallback };
