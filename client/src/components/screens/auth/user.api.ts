import { UserAuth, UserAuthId } from './types/user.types';

export const loadUsers = async (): Promise<UserAuth[]> => {
  const res = await fetch(`${process.env.PORT_BACKEND}/api/users`, {
    credentials: 'include',
  });
  const data = await res.json();
  return data;
};

export const editStatus = async (id: UserAuthId): Promise<UserAuth> => {
  const res = await fetch(`${process.env.PORT_BACKEND}/api/admins/${id}`, {
    method: 'PUT',
    credentials: 'include',
  });
  const data = await res.json();

  return data;
};

export function updateUsers(updateUser: UserAuth): any {
  throw new Error('Function not implemented.');
}

export const updateUserName = async (updateUserName: UserAuth): Promise<UserAuth> => {
  const res = await fetch(`${process.env.PORT_BACKEND}/api/users/${updateUserName.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/JSON' },
    body: JSON.stringify({
      name: updateUserName.name,
    }),
  });
  const data = await res.json();
  return data;
};

export const updateUserEmail = async (updateUserEmail: UserAuth): Promise<UserAuth> => {
  const res = await fetch(`${process.env.PORT_BACKEND}/api/users/${updateUserEmail.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/JSON' },
    body: JSON.stringify({
      email: updateUserEmail.email,
    }),
  });
  const data = await res.json();
  return data;
};

export const updateUserPassword = async (updateUserPassword: UserAuth): Promise<UserAuth> => {
  const res = await fetch(`${process.env.PORT_BACKEND}/api/users/${updateUserPassword.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/JSON' },
    body: JSON.stringify({
      password: updateUserPassword.password,
    }),
  });
  const data = await res.json();
  return data;
};