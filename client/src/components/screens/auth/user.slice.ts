import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { UserAuthId, UserState } from './types/user.types';
import * as apiUsers from './user.api';

export const initialState: UserState = {
  users: [],
  error: undefined,
};

export const getUsers = createAsyncThunk('users/getAsyncUsers', () =>
  apiUsers.loadUsers(),
);

export const putUser = createAsyncThunk(
  'admins/putAsyncUsers',
  (id: UserAuthId) => apiUsers.editStatus(id),
);

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (buider) => {
    buider
      .addCase(getUsers.fulfilled, (state, action) => {
        state.users = action.payload;
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(putUser.fulfilled, (state, action) => {
        state.users.map((user) => {
          if (user.id === action.payload.id) {
            user.status = !user.status;
          }
          return user;
        });
      })
      .addCase(putUser.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
});

export default userSlice.reducer;
