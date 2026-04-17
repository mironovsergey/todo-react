import type { User } from '@/types/user';

export interface SignUpData {
  email: string;
  password: string;
  name?: string;
}

export interface SignInData {
  email: string;
  password: string;
}

export interface TokenPair {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

export interface AuthData {
  user: User;
  tokens: TokenPair;
}
