import { UserAuth, UserAuthId } from './types/user.types';

export const loadUsers = async (): Promise<UserAuth[]> => {
  const res = await fetch('http://localhost:4000/api/users', {
    credentials: 'include',
  });
  const data = await res.json();
  return data;
};

export const editStatus = async (id: UserAuthId): Promise<UserAuth> => {
  const res = await fetch(`http://localhost:4000/api/admins/${id}`, {
    method: 'PUT',
    credentials: 'include',
  });
  const data = await res.json();

  return data;
};
