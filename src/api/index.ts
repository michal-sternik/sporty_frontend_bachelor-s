import axios from 'axios';
// eslint-disable-next-line import/no-extraneous-dependencies
import MockAdapter from 'axios-mock-adapter';
import { API_BASE_URL } from '../constants';
import apiFriends from './mockedData/friends';
import meetingInvitaions from './mockedData/meetingInvitaions';
import friendsInvitations from './mockedData/friendsInvitations';
import userDetails from './mockedData/userDetails';
// import statistics from './mockedData/statistics';

const zpiApi = axios.create({
  baseURL: API_BASE_URL, // Zastąp odpowiednim adresem bazowym
  timeout: 10000,
});

const mock = new MockAdapter(zpiApi);
// const mock2 = new MockAdapter(axios);

// Mockuj dane dla konkretnej ścieżki
mock
  .onGet(new RegExp(`${API_BASE_URL}/friends/search/*/`))
  .reply(200, apiFriends);
mock.onGet(`${API_BASE_URL}/Meeting/invitations`).reply(200, meetingInvitaions);
mock
  .onGet(`${API_BASE_URL}/Friends/invitations`)
  .reply(200, friendsInvitations);
mock.onGet(`${API_BASE_URL}/UserDetails`).reply(200, userDetails);
mock.onGet(`${API_BASE_URL}/Friends`).reply(200, apiFriends);

// mock2.onGet(`${API_BASE_URL}/statistics`).reply(200, statistics);

zpiApi.interceptors.request.use((config: any) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  // Dodaj inne modyfikacje zapytań według potrzeb

  return config;
});

export default zpiApi;
