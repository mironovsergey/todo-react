import type { ErrorResponse } from '@/types/api';
import type { Priority, SortOrder, TodosQueryParams } from '@/types/todo';

const PRIORITIES: Priority[] = ['low', 'medium', 'high'];
const SORT_ORDERS: SortOrder[] = ['asc', 'desc'];
const SORT_FIELDS: TodosQueryParams['sortBy'][] = ['createdAt', 'updatedAt', 'priority', 'title'];

export const isPriority = (value: string): value is Priority => {
  return PRIORITIES.includes(value as Priority);
};

export const isSortOrder = (value: string): value is SortOrder => {
  return SORT_ORDERS.includes(value as SortOrder);
};

export const isSortField = (value: string): value is NonNullable<TodosQueryParams['sortBy']> => {
  return SORT_FIELDS.includes(value as TodosQueryParams['sortBy']);
};

export const isErrorResponse = (value: unknown): value is ErrorResponse => {
  if (typeof value !== 'object' || value === null || !('error' in value)) {
    return false;
  }

  const { error } = value;

  return (
    typeof error === 'object' &&
    error !== null &&
    'code' in error &&
    typeof error.code === 'string' &&
    'message' in error &&
    typeof error.message === 'string' &&
    'details' in error &&
    Array.isArray(error.details)
  );
};
