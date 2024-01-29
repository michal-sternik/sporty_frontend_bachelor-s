import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { RootState } from './store';
import FriendsService from '../services/friendsService';

const initialFriendsList: any = {
  loading: false,
  friendList: [],
};

export const getFriendsList = createAsyncThunk(
  'friends/fetch',
  // eslint-disable-next-line no-empty-pattern
  async ({}: {}, thunkAPI) => {
    try {
      const response = await FriendsService.getFriendsList();
      return response;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

export const FriendsSlice = createSlice({
  name: 'friends/fetch',
  initialState: initialFriendsList,
  reducers: {
    logoutPersonFriends: (state) => {
      state.friendList = [];
    },
    retrieveAfterRefresh: (state, action) => {
      const friendsList = action.payload;
      state.friendList = friendsList;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getFriendsList.pending, (state) => {
        state.loading = true;
      })
      .addCase(getFriendsList.fulfilled, (state, action) => {
        const friendsList = action.payload;
        state.friendList = friendsList;
        state.loading = false;
      })
      .addCase(getFriendsList.rejected, (state) => {
        state.friendList = [];
        state.loading = false;
      });
  },
});

export const selectUserFriendsList = (state: RootState) =>
  state.friends.friendList;
export const selectIsLoadingUserFriendsList = (state: RootState) =>
  state.friends.loading;
export const { logoutPersonFriends } = FriendsSlice.actions;
export const { retrieveAfterRefresh } = FriendsSlice.actions;

export default FriendsSlice.reducer;
