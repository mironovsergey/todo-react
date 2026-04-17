import { useQuery, useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { updateProfile, changePassword, deleteAccount, getSessions } from '@/services/users';
import { useAuthContext } from '@/hooks/use-auth-context';
import { QUERY_KEYS, ROUTES } from '@/utils/constants';
import type { UpdateProfileData, ChangePasswordData, DeleteAccountData } from '@/types/user';

export const useUpdateProfile = () => {
  const { updateUser } = useAuthContext();

  return useMutation({
    mutationFn: (data: UpdateProfileData) => updateProfile(data),
    onSuccess: ({ data }) => {
      updateUser(data.data.user);
      toast.success('Profile updated');
    },
  });
};

export const useChangePassword = () => {
  return useMutation({
    mutationFn: (data: ChangePasswordData) => changePassword(data),
    onSuccess: () => {
      toast.success('Password changed');
    },
  });
};

export const useDeleteAccount = () => {
  const { logout } = useAuthContext();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (data: DeleteAccountData) => deleteAccount(data),
    onSuccess: async () => {
      await logout();
      toast.success('Account deleted');
      navigate(ROUTES.SIGN_IN);
    },
  });
};

export const useSessions = () => {
  return useQuery({
    queryKey: QUERY_KEYS.SESSIONS,
    queryFn: () => getSessions().then(({ data }) => data.data.sessions),
  });
};
