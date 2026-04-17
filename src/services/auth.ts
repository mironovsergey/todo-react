import { api } from '@/services/api';
import type { SuccessResponse } from '@/types/api';
import type { SignUpData, SignInData, AuthData, TokenPair } from '@/types/auth';

export const signUp = (data: SignUpData) =>
  api.post<SuccessResponse<AuthData>>('/auth/signup', data);

export const signIn = (data: SignInData) =>
  api.post<SuccessResponse<AuthData>>('/auth/signin', data);

export const refresh = (refreshToken: string) =>
  api.post<SuccessResponse<{ tokens: TokenPair }>>('/auth/refresh', { refreshToken });

export const signOut = (refreshToken: string) =>
  api.post<SuccessResponse<null>>('/auth/signout', { refreshToken });

export const signOutAll = () =>
  api.post<SuccessResponse<{ sessionsTerminated: number }>>('/auth/signout-all');
