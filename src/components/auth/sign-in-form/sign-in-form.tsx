import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link } from 'react-router-dom';
import { useSignIn } from '@/hooks/use-auth';
import { Input } from '@/components/ui/input/input';
import { Button } from '@/components/ui/button/button';
import { signInSchema } from '@/schemas/auth';
import { ROUTES } from '@/utils/constants';
import type { SignInData } from '@/types/auth';
import styles from './sign-in-form.module.scss';

export const SignInForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(signInSchema) });
  const { mutate: signIn, isPending } = useSignIn();

  const onSubmit = (data: SignInData) => {
    signIn(data);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)} noValidate>
      <h1 className={styles.title}>Welcome back</h1>

      <Input
        id="email"
        type="email"
        label="Email"
        placeholder="you@example.com"
        error={errors.email?.message}
        {...register('email')}
      />

      <Input
        id="password"
        type="password"
        label="Password"
        placeholder="Your password"
        error={errors.password?.message}
        {...register('password')}
      />

      <Button type="submit" isLoading={isPending}>
        Sign In
      </Button>

      <p className={styles.footer}>
        Don&apos;t have an account? <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
      </p>
    </form>
  );
};
