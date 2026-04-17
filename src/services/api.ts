import axios from 'axios';
import { getAccessToken, getRefreshToken, setTokens, clearTokens } from '@/utils/tokens';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = getAccessToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status !== 401 || originalRequest._retry) {
      return Promise.reject(error);
    }

    const refreshToken = getRefreshToken();

    if (!refreshToken) {
      clearTokens();
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    try {
      const { data } = await axios.post(`${API_BASE_URL}/auth/refresh`, {
        refreshToken,
      });

      setTokens(data.data.tokens);

      originalRequest.headers.Authorization = `Bearer ${data.data.tokens.accessToken}`;
      return api(originalRequest);
    } catch {
      clearTokens();
      window.location.href = '/signin';
      return Promise.reject(error);
    }
  },
);
