import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { Pagination as PaginationType } from '@/types/api';
import styles from './pagination.module.scss';

interface PaginationProps {
  pagination: PaginationType;
  onPageChange: (page: number) => void;
}

export const Pagination = ({ pagination, onPageChange }: PaginationProps) => {
  const { currentPage, totalPages, totalItems, itemsPerPage } = pagination;

  if (totalPages <= 1) return null;

  const start = (currentPage - 1) * itemsPerPage + 1;
  const end = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <div className={styles.pagination}>
      <span className={styles.info}>
        {start}–{end} of {totalItems}
      </span>

      <div className={styles.controls}>
        <button
          className={styles.pageButton}
          disabled={!pagination.hasPreviousPage}
          onClick={() => onPageChange(currentPage - 1)}
        >
          <ChevronLeft size={16} />
        </button>

        <span className={styles.current}>
          {currentPage} / {totalPages}
        </span>

        <button
          className={styles.pageButton}
          disabled={!pagination.hasNextPage}
          onClick={() => onPageChange(currentPage + 1)}
        >
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
};
