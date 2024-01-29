import { createSlice } from '@reduxjs/toolkit';
import { ChatState } from '../types';
import type { RootState } from './store';

const initialState: ChatState = {
  messages: [],
};

export const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setMessages: (state, action) => {
      state.messages = action.payload;
    },
    addMessage: (state, action) => {
      state.messages.unshift(action.payload);
    },
  },
});

export const { setMessages, addMessage } = chatSlice.actions;

export const selectMessages = (state: RootState) => state.chat.messages;

export default chatSlice.reducer;
