import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as apiPhone from './api.phone';
import { PhoneState, PhoneType } from './types/phone.type';


const initialState: PhoneState = {
  phoneList: [],
};

export const loadPhone = createAsyncThunk('phone/loadPhone', async () => {
  const phones = await apiPhone.loadPhone();
  return phones;
});

export const updatePhone = createAsyncThunk('phone/updatePhone', (phone: PhoneType) => {
  return apiPhone.updatePhone(phone);
});

export const updateYandex = createAsyncThunk('phone/updateYandex', (yandex: PhoneType) => {
  return apiPhone.updateYandex(yandex);
});

export const updateGoogle = createAsyncThunk('phone/updateGoogle', (google: PhoneType) => {
  return apiPhone.updateGoogle(google);
});

const phonesSlice = createSlice({
  name: 'phone',
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(loadPhone.fulfilled, (state, action) => {
      state.phoneList = action.payload;
    })
    .addCase(updatePhone.fulfilled, (state, action) => {
      state.phoneList = state.phoneList.map((phone) =>
        phone.id === action.payload.id ? action.payload : phone,
      );
    })
    .addCase(updateYandex.fulfilled, (state, action) => {
      state.phoneList = state.phoneList.map((phone) =>
        phone.id === action.payload.id ? action.payload : phone,
      );
    })
    .addCase(updateGoogle.fulfilled, (state, action) => {
      state.phoneList = state.phoneList.map((phone) =>
        phone.id === action.payload.id ? action.payload : phone,
      );
    })
  },
});

export default phonesSlice.reducer;