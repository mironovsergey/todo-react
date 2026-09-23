import { useTodoStats } from '@/hooks/use-todos';
import { Spinner } from '@/components/ui/spinner/spinner';
import styles from './todo-stats.module.scss';

export const TodoStats = () => {
  const { data: stats, isLoading } = useTodoStats();

  if (isLoading) {
    return <Spinner size="sm" />;
  }

  if (!stats) {
    return null;
  }

  return (
    <div className={styles.stats}>
      <div className={styles.card}>
        <span className={styles.value}>{stats.total}</span>
        <span className={styles.label}>Total</span>
      </div>
      <div className={`${styles.card} ${styles.completed}`}>
        <span className={styles.value}>{stats.completed}</span>
        <span className={styles.label}>Completed</span>
      </div>
      <div className={`${styles.card} ${styles.pending}`}>
        <span className={styles.value}>{stats.pending}</span>
        <span className={styles.label}>Pending</span>
      </div>
    </div>
  );
};
