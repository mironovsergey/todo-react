import styles from './spinner.module.scss';

interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg';
}

export const Spinner = ({ size = 'md' }: SpinnerProps) => {
  return <div className={`${styles.spinner} ${styles[size]}`} />;
};
