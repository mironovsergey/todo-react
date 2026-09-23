import type { ErrorDetail, ErrorResponse } from '@/types/api';
import type { Priority, SortBy, SortOrder } from '@/types/todo';

const PRIORITIES: readonly Priority[] = ['low', 'medium', 'high'];
const SORT_ORDERS: readonly SortOrder[] = ['asc', 'desc'];
const SORT_FIELDS: readonly SortBy[] = ['createdAt', 'updatedAt', 'priority', 'title'];

export const isPriority = (value: string): value is Priority => {
  return PRIORITIES.some((priority) => priority === value);
};

export const isSortOrder = (value: string): value is SortOrder => {
  return SORT_ORDERS.some((order) => order === value);
};

export const isSortField = (value: string): value is SortBy => {
  return SORT_FIELDS.some((field) => field === value);
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
    (!('details' in error) || Array.isArray(error.details))
  );
};

export const isErrorDetail = (value: unknown): value is ErrorDetail => {
  return (
    typeof value === 'object' &&
    value !== null &&
    'message' in value &&
    typeof value.message === 'string' &&
    (!('field' in value) || typeof value.field === 'string')
  );
};
