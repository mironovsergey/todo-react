import { SignInForm } from '@/components/auth/sign-in-form/sign-in-form';
import styles from './sign-in-page.module.scss';

export const SignInPage = () => {
  return (
    <div className={styles.page}>
      <SignInForm />
    </div>
  );
};
