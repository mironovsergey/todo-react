import { api } from '@/services/api';
import type { SuccessResponse } from '@/types/api';
import type {
  User,
  UpdateProfileData,
  ChangePasswordData,
  DeleteAccountData,
  Session,
} from '@/types/user';

export const getProfile = () => api.get<SuccessResponse<{ user: User }>>('/users/me');

export const updateProfile = (data: UpdateProfileData) =>
  api.patch<SuccessResponse<{ user: User }>>('/users/me', data);

export const changePassword = (data: ChangePasswordData) =>
  api.post<SuccessResponse<null>>('/users/me/change-password', data);

export const deleteAccount = (data: DeleteAccountData) =>
  api.delete<SuccessResponse<null>>('/users/me', { data });

export const getSessions = () =>
  api.get<SuccessResponse<{ sessions: Session[] }>>('/users/me/sessions');
