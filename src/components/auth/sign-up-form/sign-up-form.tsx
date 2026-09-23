import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link } from 'react-router-dom';
import { useSignUp } from '@/hooks/use-auth';
import { Input } from '@/components/ui/input/input';
import { Button } from '@/components/ui/button/button';
import { signUpSchema } from '@/schemas/auth';
import { ROUTES } from '@/utils/constants';
import type { SignUpData } from '@/types/auth';
import styles from './sign-up-form.module.scss';

export const SignUpForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(signUpSchema) });
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
        {...register('email')}
      />

      <Input
        id="password"
        type="password"
        label="Password"
        placeholder="At least 8 characters, letters and digits"
        error={errors.password?.message}
        {...register('password')}
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
