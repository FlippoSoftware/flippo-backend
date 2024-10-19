interface IVkontakteUserResult {
  user: {
    user_id: string;
    first_name: string;
    last_name: string;
    avatar: string;
    email: string;
    sex: number;
    verified: boolean;
    birthday: string;
  };
}

export type { IVkontakteUserResult };
