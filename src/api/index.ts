import axios from 'axios';
// eslint-disable-next-line import/no-extraneous-dependencies
import MockAdapter from 'axios-mock-adapter';
import { API_BASE_URL } from '../constants';
import apiFriends from './mockedData/friends';
import meetingInvitaions from './mockedData/meetingInvitaions';
import friendsInvitations from './mockedData/friendsInvitations';
import userDetails from './mockedData/userDetails';
import achievements from './mockedData/achievements';
import statistics from './mockedData/statistics';
import statisticsForeign from './mockedData/statisticsForeign';
import apiAchievementsUserAchievements from './mockedData/achievementsUserAchievements';
import meetingHistoryNonOrganiser from './mockedData/meetingHistoryNonOrganiser';
import meetingHistoryOrganiser from './mockedData/meetingHistoryOrganiser';
import meetingHistoryNonOrganiserForeign from './mockedData/meetingHistoryNonOrganiserForeign';
import meetingHistoryOrganiserForeign from './mockedData/meetingHistoryOrganiserForeign';
import userDetailsPatricio from './mockedData/userDetailsPatricio';
import userDetailsPedro from './mockedData/userDetailsPedro';
// import statistics from './mockedData/statistics';

const zpiApi = axios.create({
  baseURL: API_BASE_URL, // Zastąp odpowiednim adresem bazowym
  timeout: 10000,
});

const mock = new MockAdapter(zpiApi);
// const mock2 = new MockAdapter(axios);

// Mockuj dane dla konkretnej ścieżki
mock
  .onGet(`${API_BASE_URL}/Friends/48d52f6b-1635-4f8a-cf48-08dbf0222c0a`)
  .reply(200, userDetailsPatricio);
mock
  .onGet(`${API_BASE_URL}/Friends/121324a2-db5f-4770-cf47-08dbf0222c0a`)
  .reply(200, userDetailsPedro);

mock
  .onGet(new RegExp(`${API_BASE_URL}/friends/search/*/`))
  .reply(200, apiFriends);
mock.onGet(`${API_BASE_URL}/Meeting/invitations`).reply(200, meetingInvitaions);
mock
  .onGet(`${API_BASE_URL}/Friends/invitations`)
  .reply(200, friendsInvitations);
mock.onGet(`${API_BASE_URL}/UserDetails`).reply(200, userDetails);
mock
  .onGet(new RegExp(`${API_BASE_URL}/Meeting/recent/.*?\\?AsOrganizer=false`))
  .reply(200, meetingHistoryNonOrganiserForeign);
mock
  .onGet(new RegExp(`${API_BASE_URL}/Meeting/recent/.*?\\?AsOrganizer=true`))
  .reply(200, meetingHistoryOrganiserForeign);
mock
  .onGet(
    `${API_BASE_URL}/Meeting/history?PageNumber=1&PageSize=120&AsOrganizer=false`,
  )
  .reply(200, meetingHistoryNonOrganiser);
mock
  .onGet(
    `${API_BASE_URL}/Meeting/history?PageNumber=1&PageSize=120&AsOrganizer=true`,
  )
  .reply(200, meetingHistoryOrganiser);
mock.onGet(`${API_BASE_URL}/Friends`).reply(200, apiFriends);
mock
  .onGet(`${API_BASE_URL}/Achievements/user_achievements`)
  .reply(200, apiAchievementsUserAchievements);
mock
  .onGet(new RegExp(`${API_BASE_URL}/Achievements/.*?/user_achievements`))
  .reply(200, apiAchievementsUserAchievements);
mock.onGet(`${API_BASE_URL}/Achievements`).reply(200, achievements);
mock
  .onGet(new RegExp(`${API_BASE_URL}/Achievements/*/`))
  .reply(200, achievements);
mock.onGet(`${API_BASE_URL}/Statistics`).reply(200, statistics);
mock
  .onGet(new RegExp(`${API_BASE_URL}/Statistics/*/`))
  .reply(200, statisticsForeign);

zpiApi.interceptors.request.use((config: any) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  // Dodaj inne modyfikacje zapytań według potrzeb

  return config;
});

export default zpiApi;
