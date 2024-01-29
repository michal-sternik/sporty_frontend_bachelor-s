import { createSlice } from '@reduxjs/toolkit';
import type { MapState } from '../types';
import type { RootState } from './store';

const initialState: MapState = {
  isEventCreationOn: false,
  isMapVisible: false,
  isChatOpen: false,
  eventCreationCoordinates: [0, 0],
};

export const mapSlice = createSlice({
  name: 'map',
  initialState,
  reducers: {
    setIsEventCreationOn: (state, action) => {
      state.isEventCreationOn = action.payload;
    },
    setEventCreationCoordinates: (state, action) => {
      state.eventCreationCoordinates = action.payload;
    },
    setIsMapVisible: (state, action) => {
      state.isMapVisible = action.payload;
    },
    setIsChatOpen: (state, action) => {
      state.isChatOpen = action.payload;
    },
  },
});

export const {
  setEventCreationCoordinates,
  setIsEventCreationOn,
  setIsMapVisible,
  setIsChatOpen,
} = mapSlice.actions;

export const selectIsEventCreationOn = (state: RootState) =>
  state.map.isEventCreationOn;
export const selectIsMapVisible = (state: RootState) => state.map.isMapVisible;
export const selectEventCreationCoordinates = (state: RootState) =>
  state.map.eventCreationCoordinates;
export const selectIsChatOpen = (state: RootState) => state.map.isChatOpen;

export default mapSlice.reducer;
