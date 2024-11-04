import { useUnit } from "effector-react";

import {
  $username,
  $usernameError,
  $submitted,
  usernameSubmitted,
  usernameChanged
} from "../model/store/inputUsername.store";

const useInputUsername = () => {
  const [username, usernameError, submitted, onUsernameChanged, onUsernameSubmitted] = useUnit([
    $username,
    $usernameError,
    $submitted,
    usernameChanged,
    usernameSubmitted
  ]);

  return { username, usernameError, submitted, onUsernameChanged, onUsernameSubmitted };
};

export { useInputUsername };
