import { api } from '@/services/api';
import type { SuccessResponse, Pagination } from '@/types/api';
import type {
  Todo,
  TodoInput,
  TodoUpdate,
  TodoStats,
  TodoTag,
  TodosQueryParams,
} from '@/types/todo';

export const getTodos = (params?: TodosQueryParams) =>
  api.get<SuccessResponse<{ todos: Todo[]; pagination: Pagination }>>('/todos', { params });

export const getTodoById = (id: string) => api.get<SuccessResponse<{ todo: Todo }>>(`/todos/${id}`);

export const createTodo = (data: TodoInput) =>
  api.post<SuccessResponse<{ todo: Todo }>>('/todos', data);

export const updateTodo = (id: string, data: TodoUpdate) =>
  api.patch<SuccessResponse<{ todo: Todo }>>(`/todos/${id}`, data);

export const deleteTodo = (id: string) => api.delete<SuccessResponse<null>>(`/todos/${id}`);

export const bulkDeleteTodos = (ids: string[]) =>
  api.delete<SuccessResponse<{ deletedCount: number }>>('/todos', { data: { ids } });

export const toggleTodo = (id: string) =>
  api.patch<SuccessResponse<{ todo: Todo }>>(`/todos/${id}/toggle`);

export const getTodoStats = () => api.get<SuccessResponse<{ stats: TodoStats }>>('/todos/stats');

export const getTodoTags = () => api.get<SuccessResponse<{ tags: TodoTag[] }>>('/todos/tags');
