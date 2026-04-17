import { forwardRef } from 'react';
import type { InputHTMLAttributes } from 'react';
import styles from './input.module.scss';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, id, className, ...props }, ref) => {
    return (
      <div className={styles.field}>
        {label && (
          <label htmlFor={id} className={styles.label}>
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={id}
          className={`${styles.input} ${error ? styles.invalid : ''} ${className ?? ''}`}
          {...props}
        />
        {error && <span className={styles.error}>{error}</span>}
      </div>
    );
  },
);

Input.displayName = 'Input';
