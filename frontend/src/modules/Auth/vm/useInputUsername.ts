import { useUnit } from "effector-react";
import { useEffect, useRef } from "react";

import {
  $usernameInput,
  $usernameInputError,
  $userRegistration,
  $modalAuthDisabled,
  usernameInputRefChanged,
  usernameSubmitted,
  usernameInputChanged
} from "../model/store/inputUsername.store";

const useInputUsername = () => {
  const [
    usernameInput,
    usernameInputError,
    userRegistration,
    modalAuthDisabled,
    onUsernameInputChanged,
    onUsernameSubmitted,
    onUsernameInputRefChanged
  ] = useUnit([
    $usernameInput,
    $usernameInputError,
    $userRegistration,
    $modalAuthDisabled,
    usernameInputChanged,
    usernameSubmitted,
    usernameInputRefChanged
  ]);
  const usernameInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (usernameInputRef.current) onUsernameInputRefChanged(usernameInputRef.current);
  }, [onUsernameInputRefChanged]);

  return {
    usernameInput,
    usernameInputError,
    usernameInputRef,
    userRegistration,
    modalAuthDisabled,
    onUsernameInputChanged,
    onUsernameSubmitted
  };
};

export { useInputUsername };
