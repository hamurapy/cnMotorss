import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { UserAuth, UserAuthState } from './types/user.types';
import * as authApi from './auth.api';

const initialState: UserAuthState = {
  user: {},
  error: undefined,
};

export const registr = createAsyncThunk(
  'users/authRegistr',
  (newUser: UserAuth) => authApi.requestRegistr(newUser),
);

export const login = createAsyncThunk('users/authLogin', (user: UserAuth) =>
  authApi.requestLogin(user),
);

export const logout = createAsyncThunk('users/authLogout', () => {
  authApi.requestLogout();
});

export const check = createAsyncThunk('users/authCheckUser', () =>
  authApi.checkUser(),
);

export const updateUser = createAsyncThunk(
  'users/updateUser',
  (user: UserAuth) => authApi.requestUpdate(user),
);

const authSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registr.fulfilled, (state, action) => {
        if (action.payload.user) {
          state.user = action.payload.user;
        } else {
          state.error = action.payload.error;
        }
      })
      .addCase(registr.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = {};
      })
      .addCase(logout.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(check.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(check.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
});

export default authSlice.reducer;
