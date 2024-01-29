import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { LogInFormInputs, UserState } from '../types';
import type { RootState } from './store';
import AccountService from '../services/accountService';
import UserDetailsService from '../services/userDetailsService';

const initialUser: UserState = {
  token: '',
  loading: false,
  firstName: '',
  lastName: '',
  gender: 0,
  emailAddress: '',
  age: 0,
  hasAdminRole: false,
  image: {
    publicId: '',
    url: '',
  },
  recentMeetings: [
    {
      id: '',
      title: '',
      latitude: 0,
      longitude: 0,
      startDateTimeUtc: '',
      endDateTimeUtc: '',
      sportsDiscipline: 0,
      organizerUsername: '',
    },
  ],
  userName: '',
  error: null,
};

export const logInPerson = createAsyncThunk(
  'person/login',
  async (
    { email, password }: { email: string; password: string },
    thunkAPI,
  ) => {
    try {
      const json: LogInFormInputs = {
        email,
        password,
      };
      const userDataResponse = await AccountService.logInUser(json);
      return userDataResponse;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);
export const saveUserPhoto = createAsyncThunk(
  'person/photo',
  // eslint-disable-next-line no-empty-pattern
  async ({}: {}, thunkAPI) => {
    try {
      const userDataResponse = await UserDetailsService.getUserDetails();
      return userDataResponse;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

export const PersonSlice = createSlice({
  name: 'person',
  initialState: initialUser,
  reducers: {
    logoutPerson: (state) => {
      state.token = '';
      state.loading = false;
      state.firstName = '';
      state.lastName = '';
      state.age = 0;
      state.gender = 0;
      state.userName = '';
      state.emailAddress = '';
      state.image = { publicId: '', url: '' };
      state.hasAdminRole = false;
      state.recentMeetings = [
        {
          id: '',
          title: '',
          latitude: 0,
          longitude: 0,
          startDateTimeUtc: '',
          endDateTimeUtc: '',
          sportsDiscipline: 0,
          organizerUsername: '',
        },
      ];
      state.error = null;
    },
    retrieveAfterRefresh: (state, action) => {
      const userData = action.payload;
      state.token = localStorage.getItem('token')!;
      state.loading = false;
      state.firstName = userData.firstName;
      state.lastName = userData.lastName;
      state.age = +userData.age;
      state.gender = +userData.gender;
      state.userName = userData.userName;
      state.emailAddress = userData.emailAddress;
      state.error = null;
      state.hasAdminRole = userData.hasAdminRole;
      state.image = userData.image
        ? { publicId: userData.image.publicId, url: userData.image.url }
        : { publicId: '', url: '' }; // Ustawienie wartości domyślnej dla image
      state.recentMeetings = userData.recentMeetings[0]
        ? [
            {
              id: userData.recentMeetings[0].id,
              title: userData.recentMeetings[0].title,
              latitude: userData.recentMeetings[0].latitude,
              longitude: userData.recentMeetings[0].longitude,
              startDateTimeUtc: userData.recentMeetings[0].startDateTimeUtc,
              endDateTimeUtc: userData.recentMeetings[0].endDateTimeUtc,
              sportsDiscipline: userData.recentMeetings[0].sportsDiscipline,
              organizerUsername: userData.recentMeetings[0].organizerUsername,
            },
          ]
        : [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(logInPerson.pending, (state) => {
        state.loading = true;
      })
      .addCase(logInPerson.fulfilled, (state, action) => {
        const userData = action.payload;
        state.token = localStorage.getItem('token')!;
        state.loading = false;
        state.error = null;
        state.firstName = userData.firstName;
        state.lastName = userData.lastName;
        state.age = userData.age;
        state.gender = +userData.gender;
        state.userName = userData.username;
        state.emailAddress = userData.email;
        state.hasAdminRole = userData.hasAdminRole;
        // state.image = userData.image ?? { publicId: '', url: '' }; // Ustawienie wartości domyślnej dla image
        state.image = userData.image
          ? { publicId: userData.image.publicId, url: userData.image.url }
          : { publicId: '', url: '' }; // Ustawienie wartości domyślnej dla image
        state.recentMeetings = userData.recentMeetings[0]
          ? [
              {
                id: userData.recentMeetings[0].id,
                title: userData.recentMeetings[0].title,
                latitude: userData.recentMeetings[0].latitude,
                longitude: userData.recentMeetings[0].longitude,
                startDateTimeUtc: userData.recentMeetings[0].startDateTimeUtc,
                endDateTimeUtc: userData.recentMeetings[0].endDateTimeUtc,
                sportsDiscipline: userData.recentMeetings[0].sportsDiscipline,
                organizerUsername: userData.recentMeetings[0].organizerUsername,
              },
            ]
          : [];
      })
      .addCase(logInPerson.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? null;
      })
      .addCase(saveUserPhoto.fulfilled, (state, action) => {
        const userData = action.payload;
        state.token = localStorage.getItem('token')!;
        state.image = userData.image
          ? { publicId: userData.image.publicId, url: userData.image.url }
          : { publicId: '', url: '' }; // Ustawienie wartości domyślnej dla image
      });
  },
});

export const selectUserFirstName = (state: RootState) => state.user.firstName;
export const selectUserLastName = (state: RootState) => state.user.lastName;
export const selectUserToken = (state: RootState) => state.user.token;
export const selectUserLoading = (state: RootState) => state.user.loading;
export const selectUserUserName = (state: RootState) => state.user.userName;
export const selectUserGender = (state: RootState) => state.user.gender;
export const selectUserHasAdminRole = (state: RootState) =>
  state.user.hasAdminRole;
export const selectUserEmailAddress = (state: RootState) =>
  state.user.emailAddress;
export const selectUserAge = (state: RootState) => state.user.age;
export const selectUserPhoto = (state: RootState) => state.user.image!.url;
export const selectUserPhotoPublicId = (state: RootState) =>
  state.user.image!.publicId;
export const selectUserRecentMeetings = (state: RootState) =>
  state.user.recentMeetings;
export const { logoutPerson } = PersonSlice.actions;
export const { retrieveAfterRefresh } = PersonSlice.actions;

export default PersonSlice.reducer;
