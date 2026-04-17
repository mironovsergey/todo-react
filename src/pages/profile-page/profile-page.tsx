import { ProfileInfo } from '@/components/profile/profile-info/profile-info';
import { ChangePasswordForm } from '@/components/profile/change-password-form/change-password-form';
import { SessionList } from '@/components/profile/session-list/session-list';
import { DeleteAccount } from '@/components/profile/delete-account/delete-account';
import styles from './profile-page.module.scss';

export const ProfilePage = () => {
  return (
    <div className={styles.page}>
      <ProfileInfo />
      <ChangePasswordForm />
      <SessionList />
      <DeleteAccount />
    </div>
  );
};
