import axios from 'axios';
import { getToken } from './auth';

const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://api.your-domain.com' 
  : 'http://localhost:3001';

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Mock API functions for development
export const mockApi = {
  login: async (email: string, password: string) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    return {
      user: {
        id: '1',
        fullName: 'John Doe',
        email,
        subscriptionPlan: 'free' as const,
        createdAt: new Date().toISOString(),
      },
      token: 'mock-jwt-token-' + Date.now(),
    };
  },

  signup: async (userData: { fullName: string; email: string; password: string }) => {
    await new Promise(resolve => setTimeout(resolve, 1200));
    return {
      user: {
        id: Date.now().toString(),
        ...userData,
        subscriptionPlan: 'free' as const,
        createdAt: new Date().toISOString(),
      },
      token: 'mock-jwt-token-' + Date.now(),
    };
  },

  sendMessage: async (message: string) => {
    await new Promise(resolve => setTimeout(resolve, 800));
    return {
      id: Date.now().toString(),
      content: `AI response to: "${message}". This is a mock response that would normally come from your chatbot API.`,
      sender: 'ai' as const,
      timestamp: new Date().toISOString(),
      userId: '1',
    };
  },
};