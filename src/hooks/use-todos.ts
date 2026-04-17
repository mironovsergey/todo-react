import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import {
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo,
  bulkDeleteTodos,
  toggleTodo,
  getTodoStats,
  getTodoTags,
} from '@/services/todos';
import { QUERY_KEYS } from '@/utils/constants';
import type { TodoInput, TodoUpdate, TodosQueryParams } from '@/types/todo';

export const useTodos = (params?: TodosQueryParams) => {
  return useQuery({
    queryKey: [...QUERY_KEYS.TODOS, params],
    queryFn: () => getTodos(params).then(({ data }) => data.data),
  });
};

export const useTodoStats = () => {
  return useQuery({
    queryKey: QUERY_KEYS.TODO_STATS,
    queryFn: () => getTodoStats().then(({ data }) => data.data.stats),
  });
};

export const useTodoTags = () => {
  return useQuery({
    queryKey: QUERY_KEYS.TODO_TAGS,
    queryFn: () => getTodoTags().then(({ data }) => data.data.tags),
  });
};

const useInvalidateTodos = () => {
  const queryClient = useQueryClient();

  return () => {
    queryClient.invalidateQueries({ queryKey: QUERY_KEYS.TODOS });
    queryClient.invalidateQueries({ queryKey: QUERY_KEYS.TODO_STATS });
    queryClient.invalidateQueries({ queryKey: QUERY_KEYS.TODO_TAGS });
  };
};

export const useCreateTodo = () => {
  const invalidate = useInvalidateTodos();

  return useMutation({
    mutationFn: (data: TodoInput) => createTodo(data),
    onSuccess: () => {
      invalidate();
      toast.success('Todo created');
    },
  });
};

export const useUpdateTodo = () => {
  const invalidate = useInvalidateTodos();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: TodoUpdate }) => updateTodo(id, data),
    onSuccess: () => {
      invalidate();
      toast.success('Todo updated');
    },
  });
};

export const useDeleteTodo = () => {
  const invalidate = useInvalidateTodos();

  return useMutation({
    mutationFn: (id: string) => deleteTodo(id),
    onSuccess: () => {
      invalidate();
      toast.success('Todo deleted');
    },
  });
};

export const useBulkDeleteTodos = () => {
  const invalidate = useInvalidateTodos();

  return useMutation({
    mutationFn: (ids: string[]) => bulkDeleteTodos(ids),
    onSuccess: ({ data }) => {
      invalidate();
      toast.success(`${data.data.deletedCount} todos deleted`);
    },
  });
};

export const useToggleTodo = () => {
  const invalidate = useInvalidateTodos();

  return useMutation({
    mutationFn: (id: string) => toggleTodo(id),
    onSuccess: () => {
      invalidate();
    },
  });
};
