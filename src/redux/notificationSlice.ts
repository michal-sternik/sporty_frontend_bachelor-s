import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { NotificationState } from '../types';
import type { RootState } from './store';
import FriendsService from '../services/friendsService';
import EventsService from '../services/eventsService';

const initialNotificaionState: NotificationState = {
  loading: false,
  currentPost: null,
  posts: [],
  friendInvitationList: [],
  meetingInvitationList: [],
  error: null,
};

export const fetchFriendInvitations = createAsyncThunk(
  'fetchFriendInvitations',
  // eslint-disable-next-line no-empty-pattern
  async ({}: {}, thunkAPI) => {
    try {
      const response = await FriendsService.getFriendsInvitations();
      return response;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);
export const fetchMeetingInvitations = createAsyncThunk(
  'fetchMeetingInvitations',
  // eslint-disable-next-line no-empty-pattern
  async ({}: {}, thunkAPI) => {
    try {
      const response = await EventsService.getMeetingInvitations();
      return response;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

export const NotificationSlice = createSlice({
  name: 'friends&events',
  initialState: initialNotificaionState,
  reducers: {
    logoutPersonInvitations: (state) => {
      state.friendInvitationList = [];
      state.meetingInvitationList = [];
    },
    setCurrentPost: (state, action) => {
      state.currentPost = action.payload;
    },
    setPosts: (state, action) => {
      state.posts = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFriendInvitations.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchFriendInvitations.fulfilled, (state, action) => {
        const responseData = action.payload;
        state.loading = false;
        state.friendInvitationList = responseData;
      })
      .addCase(fetchFriendInvitations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? null;
      })
      .addCase(fetchMeetingInvitations.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMeetingInvitations.fulfilled, (state, action) => {
        const responseData = action.payload;
        state.loading = false;
        state.meetingInvitationList = responseData;
      })
      .addCase(fetchMeetingInvitations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? null;
      });
  },
});

export const selectFriendInvitaionList = (state: RootState) =>
  state.notification.friendInvitationList;
export const selectPosts = (state: RootState) => state.notification.posts;

export const selectCurrentPost = (state: RootState) =>
  state.notification.currentPost;
export const selectMeetingInvtitataionList = (state: RootState) =>
  state.notification.meetingInvitationList;
export const selectIsLoadingNotificationList = (state: RootState) =>
  state.notification.loading;

export const { logoutPersonInvitations, setCurrentPost, setPosts } =
  NotificationSlice.actions;

export default NotificationSlice.reducer;
