import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Pencil, Trash2, Check, X } from 'lucide-react';
import { useUpdateTodo, useDeleteTodo, useToggleTodo } from '@/hooks/use-todos';
import { Badge } from '@/components/ui/badge/badge';
import { formatRelativeDate } from '@/utils/formatters';
import { PRIORITY_LABELS } from '@/utils/constants';
import type { Todo, TodoUpdate } from '@/types/todo';
import styles from './todo-card.module.scss';

interface TodoCardProps {
  todo: Todo;
  isSelected: boolean;
  onSelect: (id: string) => void;
}

const PRIORITY_VARIANTS = {
  low: 'default',
  medium: 'warning',
  high: 'danger',
} as const;

export const TodoCard = ({ todo, isSelected, onSelect }: TodoCardProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const { mutate: toggleTodo } = useToggleTodo();
  const { mutate: updateTodo, isPending: isUpdating } = useUpdateTodo();
  const { mutate: deleteTodo, isPending: isDeleting } = useDeleteTodo();

  const { register, handleSubmit, reset } = useForm<TodoUpdate>({
    defaultValues: {
      title: todo.title,
      description: todo.description ?? '',
      priority: todo.priority,
    },
  });

  const startEditing = () => {
    reset({
      title: todo.title,
      description: todo.description ?? '',
      priority: todo.priority,
    });
    setIsEditing(true);
  };

  const cancelEditing = () => {
    setIsEditing(false);
  };

  const onSubmit = (data: TodoUpdate) => {
    updateTodo({ id: todo.id, data }, { onSuccess: () => setIsEditing(false) });
  };

  return (
    <div className={`${styles.card} ${todo.completed ? styles.completed : ''}`}>
      <div className={styles.checkboxArea}>
        <label className={styles.selectLabel}>
          <input
            type="checkbox"
            checked={isSelected}
            onChange={() => onSelect(todo.id)}
            className={styles.selectInput}
          />
          <span className={`${styles.selectBox} ${isSelected ? styles.selected : ''}`}>
            <Check size={16} />
          </span>
        </label>
        <button
          className={`${styles.toggleButton} ${todo.completed ? styles.toggled : ''}`}
          onClick={() => toggleTodo(todo.id)}
        >
          <Check size={16} />
        </button>
      </div>

      <div className={styles.content}>
        {isEditing ? (
          <form onSubmit={handleSubmit(onSubmit)} className={styles.editForm}>
            <input className={styles.editInput} {...register('title', { required: true })} />
            <textarea
              className={styles.editTextarea}
              rows={2}
              placeholder="Description..."
              {...register('description')}
            />
            <select className={styles.editSelect} {...register('priority')}>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
            <div className={styles.editActions}>
              <button type="submit" className={styles.saveButton} disabled={isUpdating}>
                <Check size={14} /> Save
              </button>
              <button type="button" className={styles.cancelButton} onClick={cancelEditing}>
                <X size={14} /> Cancel
              </button>
            </div>
          </form>
        ) : (
          <>
            <div className={styles.header}>
              <span className={`${styles.title} ${todo.completed ? styles.strikethrough : ''}`}>
                {todo.title}
              </span>
              <Badge variant={PRIORITY_VARIANTS[todo.priority]}>
                {PRIORITY_LABELS[todo.priority]}
              </Badge>
            </div>

            {todo.description && <p className={styles.description}>{todo.description}</p>}

            <div className={styles.footer}>
              <div className={styles.tags}>
                {todo.tags.map((tag) => (
                  <span key={tag} className={styles.tag}>
                    {tag}
                  </span>
                ))}
              </div>
              <span className={styles.date}>{formatRelativeDate(todo.createdAt)}</span>
            </div>
          </>
        )}
      </div>

      {!isEditing && (
        <div className={styles.actions}>
          <button className={styles.actionButton} onClick={startEditing}>
            <Pencil size={14} />
          </button>
          <button
            className={`${styles.actionButton} ${styles.deleteButton}`}
            onClick={() => deleteTodo(todo.id)}
            disabled={isDeleting}
          >
            <Trash2 size={14} />
          </button>
        </div>
      )}
    </div>
  );
};
