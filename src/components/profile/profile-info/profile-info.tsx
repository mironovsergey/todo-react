import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Pencil } from 'lucide-react';
import { useAuthContext } from '@/hooks/use-auth-context';
import { useUpdateProfile } from '@/hooks/use-user';
import { Input } from '@/components/ui/input/input';
import { Button } from '@/components/ui/button/button';
import { updateProfileSchema } from '@/schemas/user';
import { formatDate } from '@/utils/formatters';
import type { UpdateProfileData } from '@/types/user';
import styles from './profile-info.module.scss';

export const ProfileInfo = () => {
  const { user } = useAuthContext();
  const [isEditing, setIsEditing] = useState(false);
  const { mutate: updateProfile, isPending } = useUpdateProfile();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: { name: user?.name ?? '' },
  });

  if (!user) return null;

  const onSubmit = (data: UpdateProfileData) => {
    updateProfile(data, {
      onSuccess: () => setIsEditing(false),
    });
  };

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <h2 className={styles.title}>Profile</h2>
        {!isEditing && (
          <button className={styles.editButton} onClick={() => setIsEditing(true)}>
            <Pencil size={14} />
          </button>
        )}
      </div>

      {isEditing ? (
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <Input id="name" label="Name" error={errors.name?.message} {...register('name')} />
          <div className={styles.actions}>
            <Button type="submit" size="sm" isLoading={isPending}>
              Save
            </Button>
            <Button type="button" variant="secondary" size="sm" onClick={() => setIsEditing(false)}>
              Cancel
            </Button>
          </div>
        </form>
      ) : (
        <div className={styles.info}>
          <div className={styles.row}>
            <span className={styles.label}>Email</span>
            <span>{user.email}</span>
          </div>
          <div className={styles.row}>
            <span className={styles.label}>Name</span>
            <span>{user.name || '—'}</span>
          </div>
          <div className={styles.row}>
            <span className={styles.label}>Member since</span>
            <span>{formatDate(user.createdAt)}</span>
          </div>
        </div>
      )}
    </div>
  );
};
