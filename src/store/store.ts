import { configureStore } from '@reduxjs/toolkit';
import contactsReducer from './contactsSlice';

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const store = configureStore({
    reducer: {
        contacts: contactsReducer,
    },
});
