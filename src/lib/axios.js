import axios from 'axios';

import { LOCAL_STORAGE_ACCESS_TOKEN_KEY } from '@/constants/local-storage';

const api = axios.create({ baseURL: '/api' });

api.interceptors.request.use((request) => {
  const accessToken = localStorage.getItem(LOCAL_STORAGE_ACCESS_TOKEN_KEY);
  if (!accessToken) {
    return request;
  }
  request.headers.Authorization = `Bearer ${accessToken}`;
  return request;
});

export default api;
