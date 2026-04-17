import { useState, useEffect, useCallback } from 'react';
import type { ReactNode } from 'react';
import type { User } from '@/types/user';
import { getProfile } from '@/services/users';
import { signOut, signOutAll } from '@/services/auth';
import { getAccessToken, getRefreshToken, setTokens, clearTokens } from '@/utils/tokens';
import { AuthContext } from '@/context/auth-context';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadUser = async () => {
      const token = getAccessToken();

      if (!token) {
        setIsLoading(false);
        return;
      }

      try {
        const { data } = await getProfile();
        setUser(data.data.user);
      } catch {
        clearTokens();
      } finally {
        setIsLoading(false);
      }
    };

    loadUser();
  }, []);

  const login = useCallback((user: User, tokens: { accessToken: string; refreshToken: string }) => {
    setTokens(tokens);
    setUser(user);
  }, []);

  const logout = useCallback(async () => {
    const refreshToken = getRefreshToken();

    if (refreshToken) {
      try {
        await signOut(refreshToken);
      } catch {
        // Ignore
      }
    }

    clearTokens();
    setUser(null);
  }, []);

  const logoutAll = useCallback(async () => {
    try {
      await signOutAll();
    } catch {
      // Ignore
    }

    clearTokens();
    setUser(null);
  }, []);

  const updateUser = useCallback((user: User) => {
    setUser(user);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        logout,
        logoutAll,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
