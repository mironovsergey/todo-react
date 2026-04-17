import type { Priority } from '@/types/todo';

export const ROUTES = {
  SIGN_IN: '/signin',
  SIGN_UP: '/signup',
  TODOS: '/todos',
  PROFILE: '/profile',
} as const;

export const QUERY_KEYS = {
  USER: ['user'] as const,
  TODOS: ['todos'] as const,
  TODO_STATS: ['todo-stats'] as const,
  TODO_TAGS: ['todo-tags'] as const,
  SESSIONS: ['sessions'] as const,
} as const;

export const PRIORITY_LABELS: Record<Priority, string> = {
  low: 'Low',
  medium: 'Medium',
  high: 'High',
};

export const DEFAULT_PAGE_LIMIT = 20;
