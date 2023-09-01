import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import  {appApplication}  from './api.telegramCar'
import type telegramCarType from './telegramCar.types';

const initialState: telegramCarType = {
  name: '',
  email: '',
  phone: '',
  car: '',
  year: Number(''), 
  color: '',
  mileage: Number(''),
  wheel: '',
  engine: '',
  driveUnit: '',
  transmission: '',
  price: Number(''),
}

export const sentApplication = createAsyncThunk(
    'application/sentApplication',
    async ({application}: {application: telegramCarType}) => {
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
        state.car = action.payload.car;
        state.year = action.payload.year;
        state.color = action.payload.color;
        state.mileage = action.payload.mileage;
        state.wheel = action.payload.wheel;
        state.engine = action.payload.engine;
        state.driveUnit = action.payload.driveUnit;
        state.transmission = action.payload.transmission;
        state.price = action.payload.price;  
        })
        // .addCase(loadApplication.pending, (state, action) => {
        //     state.loading = true;
        //     state.loadError = undefined;
        // })
        // .addCase(loadApplication.rejected, (state, action) => {
        //    state.loadError = action.error.message;
        //    state.loading = false;
        // })
    },
});
// export const { resetLoadError } = AppSlice.actions;

export default AppSlice.reducer;