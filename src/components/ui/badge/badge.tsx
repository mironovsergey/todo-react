import type { ReactNode } from 'react';
import styles from './badge.module.scss';

interface BadgeProps {
  variant?: 'default' | 'success' | 'warning' | 'danger';
  children: ReactNode;
}

export const Badge = ({ variant = 'default', children }: BadgeProps) => {
  return <span className={`${styles.badge} ${styles[variant]}`}>{children}</span>;
};
