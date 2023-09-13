import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import  {appApplication}  from './api.telegram'
import type FormApplicationType from './telegram.types';

const initialState: FormApplicationType = {
  name: '',
  email: '',
  phone: '',
}

export const sentApplication = createAsyncThunk(
    'application/sentApplication',
    async ({application}: {application: FormApplicationType}) => {
    await appApplication({application})
    return application;
});


const AppSlice = createSlice({
    name: 'application',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(sentApplication.fulfilled, (state, action) => {
        state.name = action.payload.name;
        state.email = action.payload.email;
        state.phone = action.payload.phone;         
        })
    },
});

export default AppSlice.reducer;