import { useUnit } from 'effector-react';
import { useEffect, useRef } from 'react';

import {
  $authDisabled,
  $usernameInput,
  $usernameInputError,
  $userRegistration,
  usernameInputChanged,
  usernameInputRefChanged,
  usernameSubmitted
} from '../models/inputUsername.model';

const useInputUsername = () => {
  const [
    usernameInput,
    usernameInputError,
    userRegistration,
    authDisabled,
    onUsernameInputChanged,
    onUsernameSubmitted,
    onUsernameInputRefChanged
  ] = useUnit([
    $usernameInput,
    $usernameInputError,
    $userRegistration,
    $authDisabled,
    usernameInputChanged,
    usernameSubmitted,
    usernameInputRefChanged
  ]);
  const usernameInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (usernameInputRef.current) onUsernameInputRefChanged(usernameInputRef.current);
  }, [onUsernameInputRefChanged]);

  return {
    authDisabled,
    onUsernameInputChanged,
    onUsernameSubmitted,
    usernameInput,
    usernameInputError,
    usernameInputRef,
    userRegistration
  };
};

export { useInputUsername };
