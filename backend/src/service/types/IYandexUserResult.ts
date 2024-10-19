interface IYandexUserResult {
  login: string;
  id: string;
  client_id: string;
  psuid: string;

  old_social_login: string;

  default_email: string;
  emails: string[];

  is_avatar_empty: boolean;
  default_avatar_id: string;

  first_name: string;
  last_name: string;
  display_name: string;
  real_name: string;
  sex: string;
}

export type { IYandexUserResult };
