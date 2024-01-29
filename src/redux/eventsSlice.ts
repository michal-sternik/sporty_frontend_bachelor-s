import { createSlice } from '@reduxjs/toolkit';

import type { EventsState } from '../types';
import { type RootState } from './store';

const initialState: EventsState = {
  events: [],
  disciplineSelection: 0,
  difficultySelection: 0,
  maxParticipantsQuantitySelection: '',
  currentParticipantsQuantitySelection: '',
  currentParticipantsQuantityToSelection: '',
  minParticipantsAgeFromSelection: '',
  minParticipantsAgeToSelection: '',
  startTimeSelection: null,
  endTimeSelection: null,
  sortBySelection: 'Default',
  sortDirectionSelection: 0,
  areIncomingMeetingChosen: false,
  asOrganizerSelection: false,
  meetingVisibilitySelection: false,
  desiredBounds: [
    12.094833775233866, 47.649032142792095, 26.866278224765722,
    56.26529914268474,
  ],
  recentEvent: null,
};

export const eventsSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {
    setDesiredBounds: (state, action) => {
      state.desiredBounds = action.payload;
    },
    setMeetingVisibilitySelection: (state, action) => {
      state.meetingVisibilitySelection = action.payload;
    },
    setDisciplineSelection: (state, action) => {
      state.disciplineSelection = action.payload;
    },
    setAsOrganizerSelection: (state, action) => {
      state.asOrganizerSelection = action.payload;
    },
    setDifficultySelection: (state, action) => {
      state.difficultySelection = action.payload;
    },
    setAreIncomingMeetingChosen: (state, action) => {
      state.areIncomingMeetingChosen = action.payload;
    },
    setStartTimeSelection: (state, action) => {
      state.startTimeSelection = action.payload;
    },
    setEndTimeSelection: (state, action) => {
      state.endTimeSelection = action.payload;
    },
    setMaxParticipantsQuantitySelection: (state, action) => {
      state.maxParticipantsQuantitySelection = action.payload;
    },
    setCurrentParticipantsQuantitySelection: (state, action) => {
      state.currentParticipantsQuantitySelection = action.payload;
    },
    setCurrentParticipantsQuantityToSelection: (state, action) => {
      state.currentParticipantsQuantityToSelection = action.payload;
    },
    setMinParticipantsAgeFromSelection: (state, action) => {
      state.minParticipantsAgeFromSelection = action.payload;
    },
    setMinParticipantsAgeToSelection: (state, action) => {
      state.minParticipantsAgeToSelection = action.payload;
    },
    setSortBySelection: (state, action) => {
      state.sortBySelection = action.payload;
    },
    setSortDirectionSelection: (state, action) => {
      state.sortDirectionSelection = action.payload;
    },
    setRecentEvent: (state, action) => {
      state.recentEvent = action.payload;
    },
    clearEvents: (state) => {
      state.events = [];
    },
    setEvents: (state, action) => {
      state.events = action.payload;
    },
    addEvent: (state, action) => {
      state.events.push(action.payload);
    },
    editEvent: (state, action) => {
      const index = state.events.findIndex(
        (event) => event.id === action.payload.id,
      );
      state.events[index] = action.payload;
    },
  },
});

export const {
  setDesiredBounds,
  editEvent,
  addEvent,
  setDisciplineSelection,
  setAsOrganizerSelection,
  setDifficultySelection,
  setMeetingVisibilitySelection,
  setMaxParticipantsQuantitySelection,
  setCurrentParticipantsQuantitySelection,
  setCurrentParticipantsQuantityToSelection,
  setMinParticipantsAgeFromSelection,
  setMinParticipantsAgeToSelection,
  setStartTimeSelection,
  setEndTimeSelection,
  setSortBySelection,
  setAreIncomingMeetingChosen,
  setSortDirectionSelection,
  setRecentEvent,
  setEvents,
} = eventsSlice.actions;

export const selectDisciplineSelection = (state: RootState) =>
  state.events.disciplineSelection;
export const selectAreIncomingMeetingChosen = (state: RootState) =>
  state.events.areIncomingMeetingChosen;
export const selectMeetingVisibilitySelection = (state: RootState) =>
  state.events.meetingVisibilitySelection;
export const selectAsOrganizerSelection = (state: RootState) =>
  state.events.asOrganizerSelection;
export const selectDifficultySelection = (state: RootState) =>
  state.events.difficultySelection;
export const selectMaxParticipantsQuantitySelection = (state: RootState) =>
  state.events.maxParticipantsQuantitySelection;
export const selectCurrentParticipantsQuantitySelection = (state: RootState) =>
  state.events.currentParticipantsQuantitySelection;
export const selectCurrentParticipantsQuantityToSelection = (
  state: RootState,
) => state.events.currentParticipantsQuantityToSelection;
export const selectMinParticipantsAgeFromSelection = (state: RootState) =>
  state.events.minParticipantsAgeFromSelection;
export const selectMinParticipantsAgeToSelection = (state: RootState) =>
  state.events.minParticipantsAgeToSelection;
export const selectStartTimeSelection = (state: RootState) =>
  state.events.startTimeSelection;
export const selectEndTimeSelection = (state: RootState) =>
  state.events.endTimeSelection;
export const selectSortBySelection = (state: RootState) =>
  state.events.sortBySelection;
export const selectSortDirectionSelection = (state: RootState) =>
  state.events.sortDirectionSelection;
export const selectDesiredBounds = (state: RootState) =>
  state.events.desiredBounds;
export const selectAllEvents = (state: RootState) => state.events.events;
export const selectRecentEvent = (state: RootState) => state.events.recentEvent;

export default eventsSlice.reducer;
