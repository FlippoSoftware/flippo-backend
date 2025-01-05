import { useUnit } from 'effector-react';

import {
  $currentLanguage,
  $folders,
  $recent,
  $sessionForHeader,
  languageSwitch,
  logout,
  toAuth,
  toSettings
} from '../models/header.model';

const useHeader = () => {
  const [sessionForHeader, currentLanguage, folders, recent, onLogout, onLanguageSwitch, onToSettings, onToAuth] =
    useUnit([$sessionForHeader, $currentLanguage, $folders, $recent, logout, languageSwitch, toSettings, toAuth]);

  return {
    currentLanguage,
    folders,
    onLanguageSwitch,
    onLogout,
    onToAuth,
    onToSettings,
    recent,
    sessionForHeader
  };
};

export { useHeader };
