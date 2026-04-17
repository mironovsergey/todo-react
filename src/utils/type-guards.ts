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
