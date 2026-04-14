import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { loginApi, fetchMeApi } from '../api/client';
import { UserMe } from '../api/types';

interface AuthContextType {
  user: UserMe | null;
  loading: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAdmin: boolean;
  barberId: number | null;
}

export const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<UserMe | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (token) {
      loadUserProfile();
    } else {
      setLoading(false);
    }
  }, []);

  const loadUserProfile = async () => {
    try {
      const response = await fetchMeApi();
      setUser(response.data);
    } catch (error) {
      console.error('Failed to load user profile, token might be invalid.', error);
      logout();
    } finally {
      setLoading(false);
    }
  };

  const login = async (username: string, password: string): Promise<boolean> => {
    setLoading(true);
    try {
      const resp = await loginApi(username, password);
      localStorage.setItem('access_token', resp.data.access);
      localStorage.setItem('refresh_token', resp.data.refresh);
      await loadUserProfile();
      return true;
    } catch (error) {
      console.error('Login error', error);
      setLoading(false);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    setUser(null);
  };

  const value: AuthContextType = {
    user,
    loading,
    login,
    logout,
    isAdmin: user?.is_staff || false,
    barberId: user?.barber_id ?? null,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
