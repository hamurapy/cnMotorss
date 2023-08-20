export type UserAuthId = UserAuth['id'];

export type UserAuth = {
  id?: number;
  name?: string;
  email?: string;
  password?: string;
  admin?: boolean;
};

export type UserAuthState = {
  user: UserAuth;
  error: undefined | string;
};

export type UserState = {
  users: UserAuth[];
  error: string | undefined;
};

export type PayloadAuth = {
  user: UserAuth;
  error?: string;
};

export type PayloadUser = {
  users: UserAuth[];
  error?: string;
};

export type AuthApiError = {
  error: string;
};
