import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import authReducer from '@/components/screens/auth/auth.slice'
import userReducer from '@/components/screens/auth/user.slice';
import carsSlice from '@/components/screens/account/types/cars.slice';
import phoneReducer from '@/components/screens/phoneNumber/phone.slice';
import applicationReducer from '@/components/screens/account/application/application.slice'
import applicationFormReducer from '@/components/screens/telegram/telegramHome/telegram.slice'
import applicationContactReducer from '@/components/screens/telegram/telegramContact/contact.slice'
import telegramCarReducer from '@/components/screens/telegram/telegramCar/telegramCar.slice'
import editorReducer from '@/components/screens/account/editors/editor.slice'

const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    cars: carsSlice,
    phone: phoneReducer,
    application: applicationReducer,
    applicationForm: applicationFormReducer,
    applicationContact: applicationContactReducer,
    applicationCar: telegramCarReducer,
    editor: editorReducer
  },
});

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
