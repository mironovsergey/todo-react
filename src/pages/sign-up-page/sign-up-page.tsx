import { SignUpForm } from '@/components/auth/sign-up-form/sign-up-form';
import styles from './sign-up-page.module.scss';

export const SignUpPage = () => {
  return (
    <div className={styles.page}>
      <SignUpForm />
    </div>
  );
};
