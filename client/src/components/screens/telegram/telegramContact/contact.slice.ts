import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import  {appApplication}  from './api.contact'
import type ContactApplicationType from './contact.types';

const initialState: ContactApplicationType = {
  name: '',
  email: '',
  phone: '',
  message: '',
}

export const sentApplication = createAsyncThunk(
    'application/sentApplication',
    async ({application}: {application: ContactApplicationType}) => {
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
        state.message = action.payload.message;  
        })
    },
});

export default AppSlice.reducer;