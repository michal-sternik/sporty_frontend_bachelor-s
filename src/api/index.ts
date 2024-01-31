// eslint-disable-next-line import/no-extraneous-dependencies
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
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
import postsAll from './mockedData/postsAll';
import meetingList from './mockedData/meetingList';
import meetingListDetailed from './mockedData/meetingListDetailed';

const zpiApi = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

zpiApi.interceptors.request.use((config: any) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

const mock = new MockAdapter(zpiApi);
// token w celu obsłużenia logowania i wylogowania bez backendu
const tok = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6ImM5NmRhNzYwLTVmMjUtNGZmMi1jZjQ5LTA4ZGJmMDIyMmMwYSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiJtaWNoYWwxMjMiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJVc2VyIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZW1haWxhZGRyZXNzIjoidGVzdEB6cGkuZW1haWwiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9nZW5kZXIiOiJNYWxlIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZGF0ZW9mYmlydGgiOiIwMS8wMS8yMDAzIiwiZXhwIjoxNzA3MzEzNDU4LCJpc3MiOiJodHRwOi8venBpYXBpLmNvbSIsImF1ZCI6Imh0dHA6Ly96cGlhcGkuY29tIn0.TMSnhrC6fTBqfZnBHQyHlsIL7tPXCOXiMaFk2Bbqu6Y`;
localStorage.setItem('token', tok);
// zamockowane dane dla konkretnej ścieżki
mock
  .onGet(
    new RegExp(`${API_BASE_URL}/meeting/99c5c4fd-c733-4444-9e55-08dbf0222c33`),
  )
  .reply(200, meetingListDetailed[0]);
mock
  .onGet(
    new RegExp(`${API_BASE_URL}/meeting/bd18cdb5-8465-460f-311a-08dbfcd30697`),
  )
  .reply(200, meetingListDetailed[1]);
mock
  .onGet(
    new RegExp(`${API_BASE_URL}/meeting/3fa02cba-a41c-49b3-c1bd-08dbfd34584d`),
  )
  .reply(200, meetingListDetailed[3]);
mock
  .onGet(
    new RegExp(`${API_BASE_URL}/meeting/680c5127-2f7f-4d7c-c1be-08dbfd34584d`),
  )
  .reply(200, meetingListDetailed[4]);
mock
  .onGet(
    new RegExp(`${API_BASE_URL}/meeting/bbb75196-fc7b-45a4-c1bf-08dbfd34584d`),
  )
  .reply(200, meetingListDetailed[5]);
mock
  .onGet(
    new RegExp(`${API_BASE_URL}/meeting/88b6addf-9d5e-4570-75b9-08dbfcd3a2f4`),
  )
  .reply(200, meetingListDetailed[2]);
mock
  .onGet(new RegExp(`${API_BASE_URL}/meeting/list.*`))
  .reply(200, meetingList);
mock
  .onGet(`${API_BASE_URL}/posts/all?pageNumber=1&pageSize=120`)
  .reply(200, postsAll);
mock
  .onGet(`${API_BASE_URL}/Friends/48d52f6b-1635-4f8a-cf48-08dbf0222c0a`)
  .reply(200, userDetailsPatricio);
mock
  .onGet(`${API_BASE_URL}/Friends/121324a2-db5f-4770-cf47-08dbf0222c0a`)
  .reply(200, userDetailsPedro);

mock
  .onGet(new RegExp(`${API_BASE_URL}/Friends/search/*/`))
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

export default zpiApi;
