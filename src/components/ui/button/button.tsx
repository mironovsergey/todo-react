import type { ButtonHTMLAttributes, ReactNode } from 'react';
import styles from './button.module.scss';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  children: ReactNode;
}

export const Button = ({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  disabled,
  children,
  className,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={`${styles.button} ${styles[variant]} ${styles[size]} ${className ?? ''}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? <span className={styles.spinner} /> : children}
    </button>
  );
};
