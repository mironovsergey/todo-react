import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useDeleteAccount } from '@/hooks/use-user';
import { Input } from '@/components/ui/input/input';
import { Button } from '@/components/ui/button/button';
import { ConfirmDialog } from '@/components/ui/confirm-dialog/confirm-dialog';
import { deleteAccountSchema } from '@/schemas/user';
import type { DeleteAccountData } from '@/types/user';
import styles from './delete-account.module.scss';

export const DeleteAccount = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: zodResolver(deleteAccountSchema) });
  const { mutate: deleteAccount, isPending } = useDeleteAccount();

  // Submitting the form, by the button or by Enter, only validates the password and asks
  // for confirmation; the account is deleted from the dialog.
  const openDialog = () => {
    setIsDialogOpen(true);
  };

  const onConfirm = (data: DeleteAccountData) => {
    setIsDialogOpen(false);
    deleteAccount(data);
  };

  return (
    <div className={styles.card}>
      <h2 className={styles.title}>Danger Zone</h2>
      <p className={styles.warning}>
        Deleting your account is permanent. All your data including todos and sessions will be
        removed.
      </p>

      <form onSubmit={handleSubmit(openDialog)} className={styles.form} noValidate>
        <Input
          id="deletePassword"
          type="password"
          label="Confirm your password"
          error={errors.password?.message}
          {...register('password')}
        />
        <Button type="submit" variant="danger" isLoading={isPending}>
          Delete Account
        </Button>
      </form>

      <ConfirmDialog
        isOpen={isDialogOpen}
        title="Delete account?"
        message="This action cannot be undone. All your data will be permanently deleted."
        confirmLabel="Delete"
        onConfirm={handleSubmit(onConfirm)}
        onCancel={() => {
          setIsDialogOpen(false);
          reset();
        }}
      />
    </div>
  );
};
