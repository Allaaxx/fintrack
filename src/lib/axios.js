import axios from 'axios';

import {
  LOCAL_STORAGE_ACCESS_TOKEN_KEY,
  LOCAL_STORAGE_REFRESH_TOKEN_KEY,
} from '@/constants/local-storage';

const API_URL = import.meta.env.VITE_API_URL;

export const protectedApi = axios.create({
  baseURL: `${API_URL}/api`,
});

export const publicApi = axios.create({
  baseURL: `${API_URL}/api`,
});

protectedApi.interceptors.request.use((request) => {
  const accessToken = localStorage.getItem(LOCAL_STORAGE_ACCESS_TOKEN_KEY);

  if (accessToken) {
    request.headers.Authorization = `Bearer ${accessToken}`;
  }

  return request;
});

protectedApi.interceptors.response.use(
  (response) => response,
  async (error) => {
    const request = error.config;
    const refreshToken = localStorage.getItem(LOCAL_STORAGE_REFRESH_TOKEN_KEY);

    if (!request || !error.response || !refreshToken) {
      return Promise.reject(error);
    }

    const isUnauthorized = error.response.status === 401;
    const isRefreshRequest = request.url?.includes('/auth/refresh-token');

    if (isUnauthorized && !request._retry && !isRefreshRequest) {
      request._retry = true;

      try {
        const response = await protectedApi.post('/auth/refresh-token', {
          refreshToken,
        });

        const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
          response.data.tokens;

        localStorage.setItem(LOCAL_STORAGE_ACCESS_TOKEN_KEY, newAccessToken);

        localStorage.setItem(LOCAL_STORAGE_REFRESH_TOKEN_KEY, newRefreshToken);

        request.headers.Authorization = `Bearer ${newAccessToken}`;

        return protectedApi(request);
      } catch (refreshError) {
        localStorage.removeItem(LOCAL_STORAGE_ACCESS_TOKEN_KEY);
        localStorage.removeItem(LOCAL_STORAGE_REFRESH_TOKEN_KEY);

        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default protectedApi;
