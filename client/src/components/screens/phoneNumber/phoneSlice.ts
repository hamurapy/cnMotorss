import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Phone, PhonesState } from './type';

const initialState: PhonesState = {
    phoneNumber: '',
    error: 'error',
  };
  
  export const loadPhone = createAsyncThunk('phone/load', () =>
  async (): Promise<Phone[]> => {
    const res = await fetch('http://localhost:4000/api/phone');
    return res.json();
  }
);

const phoneSlice = createSlice({
    name: 'phone',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(loadPhone.fulfilled, (state, action) => {
            state.phoneNumber = action.payload;
        })
        .addCase(loadPhone.rejected, (state, action) => {
          state.error = action.error.message;
        })
    },
  });
  
  export default phoneSlice.reducer;
  