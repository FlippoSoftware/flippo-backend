type TProfileButtonProps = {
  avatar?: string;
  language: string;
  onLanguageSwitch: () => void;
  onLogout: () => void;
  onSettings: () => void;
  username: string;
};

export type { TProfileButtonProps };
