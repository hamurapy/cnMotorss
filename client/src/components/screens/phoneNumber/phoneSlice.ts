import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Phone, PhonesState } from './type';
import * as api from '../account/redux/api';

const initialState: PhonesState = {
    phones: [],
    error: 'error',
  };
  
  export const loadPhone = createAsyncThunk('phone/load', async () => {
    const phones = await api.loadPhones()
    return phones
  }
);

const phoneSlice = createSlice({
    name: 'phone',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
      .addCase(loadPhone.fulfilled, (state, action) => {
        state.phones = action.payload;
      })
    },
  });
  
  export default phoneSlice.reducer;
  