import axios from 'axios';
import { API_BASE_URL } from '../constants';

const zpiApi = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10 * 1000,
});

zpiApi.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default zpiApi;
