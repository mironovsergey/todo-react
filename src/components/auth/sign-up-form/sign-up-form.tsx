import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { useSignUp } from '@/hooks/use-auth';
import { Input } from '@/components/ui/input/input';
import { Button } from '@/components/ui/button/button';
import { ROUTES } from '@/utils/constants';
import type { SignUpData } from '@/types/auth';
import styles from './sign-up-form.module.scss';

export const SignUpForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpData>();
  const { mutate: signUp, isPending } = useSignUp();

  const onSubmit = (data: SignUpData) => {
    signUp(data);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)} noValidate>
      <h1 className={styles.title}>Create account</h1>

      <Input
        id="name"
        label="Name"
        placeholder="John Doe"
        error={errors.name?.message}
        {...register('name')}
      />

      <Input
        id="email"
        type="email"
        label="Email"
        placeholder="you@example.com"
        error={errors.email?.message}
        {...register('email', { required: 'Email is required' })}
      />

      <Input
        id="password"
        type="password"
        label="Password"
        placeholder="At least 8 characters"
        error={errors.password?.message}
        {...register('password', {
          required: 'Password is required',
          minLength: { value: 8, message: 'Minimum 8 characters' },
        })}
      />

      <Button type="submit" isLoading={isPending}>
        Sign Up
      </Button>

      <p className={styles.footer}>
        Already have an account? <Link to={ROUTES.SIGN_IN}>Sign In</Link>
      </p>
    </form>
  );
};
