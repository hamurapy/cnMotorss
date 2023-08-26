import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import authReducer from '@/components/screens/auth/auth.slice'
import userReducer from '@/components/screens/auth/user.slice';
import carsSlice from './components/screens/account/redux/carsSlice';
import phoneSlice from '@/components/screens/phoneNumber/phoneSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    cars: carsSlice,
    phoneNumber: phoneSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
