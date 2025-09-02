export interface User {
  id: string;
  fullName: string;
  email: string;
  subscriptionPlan: 'free' | 'pro' | 'enterprise';
  createdAt: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface ChatMessage {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: string;
  userId: string;
}

export interface CalendarEvent {
  id: string;
  title: string;
  date: string;
  startTime: string;
  endTime: string;
  description?: string;
  type: 'class' | 'assignment' | 'exam' | 'meeting' | 'holiday';
  userId: string;
}

export interface Chat {
  id: string;
  title: string;
  messages: ChatMessage[];
  lastUpdated: string;
  userId: string;
}

export type CalendarView = 'month' | 'week' | 'day';

export interface SubscriptionPlan {
  id: string;
  name: string;
  price: number;
  features: string[];
  isPopular?: boolean;
}