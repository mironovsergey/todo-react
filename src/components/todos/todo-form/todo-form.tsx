import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Plus, ChevronDown, ChevronUp } from 'lucide-react';
import { useCreateTodo } from '@/hooks/use-todos';
import { Input } from '@/components/ui/input/input';
import { Button } from '@/components/ui/button/button';
import { createTodoSchema } from '@/schemas/todo';
import type { TodoInput } from '@/types/todo';
import styles from './todo-form.module.scss';

export const TodoForm = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: zodResolver(createTodoSchema) });
  const { mutate: createTodo, isPending } = useCreateTodo();

  const onSubmit = ({ tags, ...data }: TodoInput) => {
    createTodo(
      { ...data, tags: tags?.length ? tags : undefined },
      {
        onSuccess: () => {
          reset();
          setIsExpanded(false);
        },
      },
    );
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className={styles.mainRow}>
        <Input
          id="title"
          placeholder="What needs to be done?"
          error={errors.title?.message}
          {...register('title', { required: 'Title is required' })}
        />
        <Button type="submit" isLoading={isPending} size="md">
          <Plus size={18} />
          Add
        </Button>
      </div>

      <button
        type="button"
        className={styles.toggleDetails}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
        {isExpanded ? 'Less options' : 'More options'}
      </button>

      {isExpanded && (
        <div className={styles.details}>
          <div className={styles.field}>
            <label htmlFor="description" className={styles.label}>
              Description
            </label>
            <textarea
              id="description"
              className={styles.textarea}
              placeholder="Add details..."
              rows={3}
              {...register('description')}
            />
            {errors.description && (
              <span className={styles.error}>{errors.description.message}</span>
            )}
          </div>

          <div className={styles.row}>
            <div className={styles.field}>
              <label htmlFor="priority" className={styles.label}>
                Priority
              </label>
              <select id="priority" className={styles.select} {...register('priority')}>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
                <option value="high">High</option>
              </select>
            </div>

            <div className={styles.field}>
              <label htmlFor="tags" className={styles.label}>
                Tags
              </label>
              <input
                id="tags"
                className={styles.tagsInput}
                placeholder="work, urgent"
                {...register('tags')}
              />
              {errors.tags && <span className={styles.error}>{errors.tags.message}</span>}
            </div>
          </div>
        </div>
      )}
    </form>
  );
};
