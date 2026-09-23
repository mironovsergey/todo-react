import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useChangePassword } from '@/hooks/use-user';
import { Input } from '@/components/ui/input/input';
import { Button } from '@/components/ui/button/button';
import { changePasswordSchema } from '@/schemas/user';
import type { ChangePasswordData } from '@/types/user';
import styles from './change-password-form.module.scss';

export const ChangePasswordForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: zodResolver(changePasswordSchema) });
  const { mutate: changePassword, isPending } = useChangePassword();

  const onSubmit = (data: ChangePasswordData) => {
    changePassword(data, {
      onSuccess: () => reset(),
    });
  };

  return (
    <div className={styles.card}>
      <h2 className={styles.title}>Change Password</h2>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form} noValidate>
        <Input
          id="currentPassword"
          type="password"
          label="Current password"
          error={errors.currentPassword?.message}
          {...register('currentPassword')}
        />
        <Input
          id="newPassword"
          type="password"
          label="New password"
          error={errors.newPassword?.message}
          {...register('newPassword')}
        />
        <Button type="submit" isLoading={isPending}>
          Change Password
        </Button>
      </form>
    </div>
  );
};
