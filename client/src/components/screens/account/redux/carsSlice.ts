import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Car, CarId, CarsState } from '../../catalog/catalog.types';
import * as api from './api';

const initialState: CarsState = {
  cars: [],
  error: 'error',
};

export const loadCars = createAsyncThunk('load/loadCars', async () => {
  const cars = await api.loadCars();
  return cars;
});

export const addCar = createAsyncThunk('add/car', (car: FormData) =>
  api.addCarFetch(car)
);

export const updateCar = createAsyncThunk('update/car', (car: FormData) =>
  api.updateCarFetch(car)
);

export const deleteCar = createAsyncThunk('delete/car', (car: CarId) =>
  api.deleteCarFetch(car)
);

const carsSlice = createSlice({
  name: 'cars',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadCars.fulfilled, (state, action) => {
        state.cars = action.payload;
      })
      .addCase(addCar.fulfilled, (state, action) => {
        state.cars.push(action.payload);
      })
      .addCase(addCar.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(updateCar.fulfilled, (state, action) => {
        state.cars = state.cars.map((car) =>
        car.id === action.payload.id ? action.payload : car);
      })
      .addCase(updateCar.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(deleteCar.fulfilled, (state, action) => {
        state.cars = state.cars.filter((car) => car.id !== action.payload);
      })
      .addCase(deleteCar.rejected, (state, action) => {
        state.error = action.error.message;
      })
  },
});

export default carsSlice.reducer;
