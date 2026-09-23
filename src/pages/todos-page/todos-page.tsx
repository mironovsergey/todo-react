import { useState, useCallback } from 'react';
import { Trash2 } from 'lucide-react';
import { useTodos, useBulkDeleteTodos } from '@/hooks/use-todos';
import { TodoStats } from '@/components/todos/todo-stats/todo-stats';
import { TodoForm } from '@/components/todos/todo-form/todo-form';
import { TodoFilters } from '@/components/todos/todo-filters/todo-filters';
import { TodoList } from '@/components/todos/todo-list/todo-list';
import { Pagination } from '@/components/todos/pagination/pagination';
import { Button } from '@/components/ui/button/button';
import type { TodosQueryParams } from '@/types/todo';
import styles from './todos-page.module.scss';

export const TodosPage = () => {
  const [params, setParams] = useState<TodosQueryParams>({ page: 1, limit: 20 });
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const { data, isLoading } = useTodos(params);
  const { mutate: bulkDelete, isPending: isBulkDeleting } = useBulkDeleteTodos();

  // Deleting the remaining todos of the last page leaves the current page past the end;
  // the API returns an empty list for it, so the page moves back to the last one.
  const lastPage = data ? Math.max(data.pagination.totalPages, 1) : 1;

  if (data && data.pagination.currentPage > lastPage) {
    setParams({ ...params, page: lastPage });
  }

  const visibleIds = new Set(data?.todos.map((t) => t.id) ?? []);
  const visibleSelectedIds = new Set([...selectedIds].filter((id) => visibleIds.has(id)));

  const handleSelect = useCallback((id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }, []);

  const handleBulkDelete = () => {
    bulkDelete([...visibleSelectedIds], {
      onSuccess: () => setSelectedIds(new Set()),
    });
  };

  const handlePageChange = (page: number) => {
    setParams((prev) => ({ ...prev, page }));
  };

  return (
    <div className={styles.page}>
      <TodoStats />
      <TodoForm />
      <TodoFilters params={params} onChange={setParams} />

      {visibleSelectedIds.size > 0 && (
        <div className={styles.bulkBar}>
          <span>{visibleSelectedIds.size} selected</span>
          <Button variant="danger" size="sm" isLoading={isBulkDeleting} onClick={handleBulkDelete}>
            <Trash2 size={14} />
            Delete selected
          </Button>
        </div>
      )}

      <TodoList
        todos={data?.todos ?? []}
        isLoading={isLoading}
        selectedIds={visibleSelectedIds}
        onSelect={handleSelect}
      />

      {data?.pagination && (
        <Pagination pagination={data.pagination} onPageChange={handlePageChange} />
      )}
    </div>
  );
};
