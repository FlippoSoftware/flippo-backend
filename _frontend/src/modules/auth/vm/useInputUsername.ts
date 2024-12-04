import { useUnit } from 'effector-react';
import { useEffect, useRef } from 'react';

import {
  $usernameInput,
  $usernameInputError,
  usernameInputChanged,
  usernameInputRefChanged,
  usernameSubmitted
} from '../models/inputUsername.model';

const useInputUsername = () => {
  const [usernameInput, usernameInputError, onUsernameInputChanged, onUsernameSubmitted, onUsernameInputRefChanged] =
    useUnit([$usernameInput, $usernameInputError, usernameInputChanged, usernameSubmitted, usernameInputRefChanged]);
  const usernameInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (usernameInputRef.current) onUsernameInputRefChanged(usernameInputRef.current);
  }, [onUsernameInputRefChanged]);

  return {
    onUsernameInputChanged,
    onUsernameSubmitted,
    usernameInput,
    usernameInputError,
    usernameInputRef
  };
};

export { useInputUsername };
