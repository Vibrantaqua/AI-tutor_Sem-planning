import { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { User } from '../types';
import { getToken, setToken, removeToken, isTokenValid } from '../utils/auth';
import { mockApi } from '../utils/api';

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (userData: { fullName: string; email: string; password: string }) => Promise<void>;
  logout: () => void;
  loginAsGuest: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setTokenState] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initAuth = () => {
      const savedToken = getToken();
      if (savedToken && isTokenValid(savedToken)) {
        setTokenState(savedToken);
        // In a real app, you'd fetch user data from the API
        setUser({
          id: '1',
          fullName: 'Current User',
          email: 'user@example.com',
          subscriptionPlan: 'free',
          createdAt: new Date().toISOString(),
        });
      }
      setIsLoading(false);
    };

    initAuth();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      const response = await mockApi.login(email, password);
      setToken(response.token);
      setTokenState(response.token);
      setUser(response.user);
    } catch (error) {
      throw new Error('Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (userData: { fullName: string; email: string; password: string }) => {
    try {
      setIsLoading(true);
      const response = await mockApi.signup(userData);
      setToken(response.token);
      setTokenState(response.token);
      setUser(response.user);
    } catch (error) {
      throw new Error('Signup failed');
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    removeToken();
    setTokenState(null);
    setUser(null);
  };

  const loginAsGuest = () => {
    setUser({
      id: 'guest',
      fullName: 'Guest User',
      email: 'guest@demo.com',
      subscriptionPlan: 'free',
      createdAt: new Date().toISOString(),
    });
    setTokenState('guest-token');
  };

  const value = {
    user,
    token,
    isAuthenticated: !!user,
    isLoading,
    login,
    signup,
    logout,
    loginAsGuest,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};