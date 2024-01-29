import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import eventsReducer from './eventsSlice';
import userReducer from './userSlice';
import mapReducer from './mapSlice';
import notificationReducer from './notificationSlice';
import chatReducer from './chatSlice';
import friendsReducer from './friendsSlice';

export const store = configureStore({
  reducer: {
    events: eventsReducer,
    user: userReducer,
    map: mapReducer,
    notification: notificationReducer,
    chat: chatReducer,
    friends: friendsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
