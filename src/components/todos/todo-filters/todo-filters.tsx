import { useState, useEffect } from 'react';
import type { Dispatch, SetStateAction } from 'react';
import { Search, X } from 'lucide-react';
import { useTodoTags } from '@/hooks/use-todos';
import { isPriority, isSortField, isSortOrder } from '@/utils/type-guards';
import type { TodosQueryParams } from '@/types/todo';
import styles from './todo-filters.module.scss';

interface TodoFiltersProps {
  params: TodosQueryParams;
  onChange: Dispatch<SetStateAction<TodosQueryParams>>;
}

export const TodoFilters = ({ params, onChange }: TodoFiltersProps) => {
  const [searchInput, setSearchInput] = useState(params.search ?? '');
  const { data: tags } = useTodoTags();

  useEffect(() => {
    const timeout = setTimeout(() => {
      const search = searchInput.trim() || undefined;

      // The updater receives the latest params, so a filter changed during the delay is kept.
      onChange((prev) => (prev.search === search ? prev : { ...prev, search, page: 1 }));
    }, 400);

    return () => clearTimeout(timeout);
  }, [searchInput, onChange]);

  const handleCompletedChange = (value: string) => {
    const completed = value === 'all' ? undefined : value === 'true';
    onChange({ ...params, completed, page: 1 });
  };

  // The "all" option is not a priority, so it clears the filter.
  const handlePriorityChange = (value: string) => {
    onChange({ ...params, priority: isPriority(value) ? value : undefined, page: 1 });
  };

  const handleSortChange = (value: string) => {
    if (isSortField(value)) {
      onChange({ ...params, sortBy: value });
    }
  };

  const handleOrderChange = (value: string) => {
    if (isSortOrder(value)) {
      onChange({ ...params, order: value });
    }
  };

  const handleTagClick = (tag: string) => {
    const currentTags = params.tags ? params.tags.split(',') : [];
    const newTags = currentTags.includes(tag)
      ? currentTags.filter((t) => t !== tag)
      : [...currentTags, tag];

    onChange({ ...params, tags: newTags.length ? newTags.join(',') : undefined, page: 1 });
  };

  const clearFilters = () => {
    setSearchInput('');
    onChange({ page: 1, limit: params.limit });
  };

  const hasActiveFilters =
    params.completed !== undefined ||
    params.priority !== undefined ||
    params.search !== undefined ||
    params.tags !== undefined;

  const selectedTags = params.tags ? params.tags.split(',') : [];

  return (
    <div className={styles.filters}>
      <div className={styles.searchRow}>
        <div className={styles.searchField}>
          <Search size={16} className={styles.searchIcon} />
          <input
            type="text"
            placeholder="Search todos..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className={styles.searchInput}
          />
        </div>
        {hasActiveFilters && (
          <button className={styles.clearButton} onClick={clearFilters}>
            <X size={14} />
            Clear
          </button>
        )}
      </div>

      <div className={styles.controlsRow}>
        <select
          value={params.completed === undefined ? 'all' : String(params.completed)}
          onChange={(e) => handleCompletedChange(e.target.value)}
          className={styles.select}
        >
          <option value="all">All status</option>
          <option value="false">Pending</option>
          <option value="true">Completed</option>
        </select>

        <select
          value={params.priority ?? 'all'}
          onChange={(e) => handlePriorityChange(e.target.value)}
          className={styles.select}
        >
          <option value="all">All priorities</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>

        <select
          value={params.sortBy ?? 'createdAt'}
          onChange={(e) => handleSortChange(e.target.value)}
          className={styles.select}
        >
          <option value="createdAt">Created</option>
          <option value="updatedAt">Updated</option>
          <option value="priority">Priority</option>
          <option value="title">Title</option>
        </select>

        <select
          value={params.order ?? 'desc'}
          onChange={(e) => handleOrderChange(e.target.value)}
          className={styles.select}
        >
          <option value="desc">Newest first</option>
          <option value="asc">Oldest first</option>
        </select>
      </div>

      {tags && tags.length > 0 && (
        <div className={styles.tagsRow}>
          {tags.map(({ tag }) => (
            <button
              key={tag}
              className={`${styles.tagChip} ${selectedTags.includes(tag) ? styles.tagActive : ''}`}
              onClick={() => handleTagClick(tag)}
            >
              {tag}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
