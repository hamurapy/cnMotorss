import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as apiUser from './user.api';
import { UserState, UserAuth } from './types/user.types';


const initialState: UserState = {
  users: [],
  error: undefined 
};

export const loadUser = createAsyncThunk('user/loadUser', async () => {
  const users = await apiUser.loadUsers();
  return users;
});

export const updateUserName = createAsyncThunk(
  'user/updateUserName',
  (updateUserName: UserAuth) =>
    apiUser.updateUserName(updateUserName),
);

export const updateUserEmail = createAsyncThunk(
  'user/updateUserEmail',
  (updateUserEmail: UserAuth) =>
    apiUser.updateUserEmail(updateUserEmail),
);

export const updateUserPassword = createAsyncThunk(
  'user/updateUserPassword',
  (updateUserPassword: UserAuth) =>
    apiUser.updateUserPassword(updateUserPassword),
);

const usersSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
    .addCase(loadUser.fulfilled, (state, action) => {
      state.users = action.payload;
    })
    .addCase(updateUserName.fulfilled, (state, action) => {
      state.users = state.users.map((user) =>
      user.id === action.payload.id ? action.payload : user,
      );
    })
    .addCase(updateUserName.rejected, (state, action) => {
      state.error = action.error.message;
    })
    .addCase(updateUserEmail.fulfilled, (state, action) => {
      state.users = state.users.map((user) =>
      user.id === action.payload.id ? action.payload : user,
      );
    })
    .addCase(updateUserEmail.rejected, (state, action) => {
      state.error = action.error.message;
    })
    .addCase(updateUserPassword.fulfilled, (state, action) => {
      state.users = state.users.map((user) =>
      user.id === action.payload.id ? action.payload : user,
      );
    })
    .addCase(updateUserPassword.rejected, (state, action) => {
      state.error = action.error.message;
    });
  },
});

export default usersSlice.reducer;