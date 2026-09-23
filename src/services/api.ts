import axios, { isAxiosError } from 'axios';
import type { AxiosError } from 'axios';
import type { SuccessResponse } from '@/types/api';
import type { TokenPair } from '@/types/auth';
import { getAccessToken, getRefreshToken, setTokens, clearTokens } from '@/utils/tokens';
import { isErrorResponse } from '@/utils/type-guards';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

/**
 * Error codes that signal a rejected access token. Only these trigger a token refresh;
 * any other 401 response, such as a wrong password, is passed to the caller unchanged.
 */
const REFRESHABLE_ERROR_CODES = new Set(['TOKEN_EXPIRED', 'INVALID_TOKEN']);

type SessionExpiredListener = () => void;

const sessionExpiredListeners = new Set<SessionExpiredListener>();

/**
 * The token refresh currently in flight. Refresh tokens are single-use, so concurrent
 * requests rejected with an expired access token share one refresh instead of each
 * sending its own and invalidating the others.
 */
let refreshPromise: Promise<TokenPair> | null = null;

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Subscribes to the end of the session caused by a failed token refresh.
 * Returns a function that removes the subscription.
 */
export const onSessionExpired = (listener: SessionExpiredListener): (() => void) => {
  sessionExpiredListeners.add(listener);

  return () => {
    sessionExpiredListeners.delete(listener);
  };
};

const expireSession = () => {
  clearTokens();
  sessionExpiredListeners.forEach((listener) => listener());
};

const requestTokenRefresh = async (): Promise<TokenPair> => {
  const refreshToken = getRefreshToken();

  if (!refreshToken) {
    throw new Error('No refresh token available');
  }

  const { data } = await axios.post<SuccessResponse<{ tokens: TokenPair }>>(
    `${API_BASE_URL}/auth/refresh`,
    { refreshToken },
  );

  setTokens(data.data.tokens);

  return data.data.tokens;
};

const refreshTokens = (): Promise<TokenPair> => {
  refreshPromise ??= requestTokenRefresh().finally(() => {
    refreshPromise = null;
  });

  return refreshPromise;
};

const isRefreshableError = (error: AxiosError<unknown, unknown>): boolean => {
  const data = error.response?.data;

  return (
    error.response?.status === 401 &&
    isErrorResponse(data) &&
    REFRESHABLE_ERROR_CODES.has(data.error.code)
  );
};

api.interceptors.request.use((config) => {
  const token = getAccessToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error: unknown) => {
    if (!isAxiosError<unknown, unknown>(error) || !error.config || !isRefreshableError(error)) {
      return Promise.reject(error);
    }

    const originalRequest = error.config;
    let tokens: TokenPair;

    try {
      tokens = await refreshTokens();
    } catch (refreshError) {
      // A refresh that never reached the server says nothing about the session,
      // so the tokens are kept. Any other failure means the refresh token is invalid.
      if (isAxiosError(refreshError) && !refreshError.response) {
        return Promise.reject(refreshError);
      }

      expireSession();
      return Promise.reject(error);
    }

    originalRequest.headers.Authorization = `Bearer ${tokens.accessToken}`;

    // The retry goes through the base axios instance, which has no interceptors,
    // so a rejected retry cannot trigger another refresh.
    return axios.request(originalRequest);
  },
);
