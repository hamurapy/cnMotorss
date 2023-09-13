import { AuthApiError, PayloadAuth, UserAuth } from './types/user.types';

export const requestLogin = async (user: UserAuth): Promise<UserAuth> => {
  const response = await fetch('http://localhost:4000/api/auth/login', {
    method: 'POST',
    credentials: 'include',
    body: JSON.stringify(user),
    headers: { 'Content-Type': 'application/json' },
  });
  const data = await response.json();

  if (!response.ok) {
    throw new Error((data as AuthApiError).error);
  }

  return data as UserAuth;
};

export const requestRegistr = async (
  newUser: UserAuth,
): Promise<PayloadAuth> => {
  const response = await fetch('http://localhost:4000/api/auth/registration', {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: newUser.email,
      password: newUser.password,
    }),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error((data as AuthApiError).error);
  }

  return data as PayloadAuth;
};

export const requestLogout = async (): Promise<PayloadAuth> => {
  const response = await fetch('http://localhost:4000/api/auth/logout', {
    method: 'DELETE',
    credentials: 'include',
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error((data as AuthApiError).error);
  }

  return data as PayloadAuth;
};

export const checkUser = async (): Promise<UserAuth> => {
  const response = await fetch('http://localhost:4000/api/auth/user', {
    method: 'GET',
    credentials: 'include',
  });
  const data = await response.json();

  if (!response.ok) {
    throw new Error((data as AuthApiError).error);
  }

  return data as UserAuth;
};

export const requestUpdate = async (user: UserAuth): Promise<UserAuth> => {
  const response = await fetch(`http://localhost:4000/api/users/${user.id}`, {
    method: 'PUT',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: user.name,
      email: user.email,
      password: user.password,
      admin: user.admin,
    }),
  });
  const data = await response.json();
  return data;
};
