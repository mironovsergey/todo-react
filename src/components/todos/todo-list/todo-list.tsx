import { TodoCard } from '@/components/todos/todo-card/todo-card';
import { Spinner } from '@/components/ui/spinner/spinner';
import type { Todo } from '@/types/todo';
import styles from './todo-list.module.scss';

interface TodoListProps {
  todos: Todo[];
  isLoading: boolean;
  selectedIds: Set<string>;
  onSelect: (id: string) => void;
}

export const TodoList = ({ todos, isLoading, selectedIds, onSelect }: TodoListProps) => {
  if (isLoading) {
    return (
      <div className={styles.centered}>
        <Spinner />
      </div>
    );
  }

  if (todos.length === 0) {
    return (
      <div className={styles.centered}>
        <p className={styles.empty}>No todos found. Create one above!</p>
      </div>
    );
  }

  return (
    <div className={styles.list}>
      {todos.map((todo) => (
        <TodoCard
          key={todo.id}
          todo={todo}
          isSelected={selectedIds.has(todo.id)}
          onSelect={onSelect}
        />
      ))}
    </div>
  );
};
