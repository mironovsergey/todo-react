export interface User {
  id: string;
  email: string;
  name: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface UpdateProfileData {
  name?: string | null;
}

export interface ChangePasswordData {
  currentPassword: string;
  newPassword: string;
}

export interface DeleteAccountData {
  password: string;
}

export interface Session {
  id: string;
  createdAt: string;
  expiresAt: string;
  userAgent: string | null;
  ipAddress: string | null;
  current: boolean;
}
