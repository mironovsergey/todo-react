import { createContext } from 'react';
import type { User } from '@/types/user';

export interface AuthContextValue {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (user: User, tokens: { accessToken: string; refreshToken: string }) => void;
  logout: () => Promise<void>;
  logoutAll: () => Promise<void>;
  updateUser: (user: User) => void;
}

export const AuthContext = createContext<AuthContextValue | null>(null);
