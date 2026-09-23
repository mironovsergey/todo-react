import { z } from 'zod';

// Field rules follow the API specification, so invalid input is rejected before a request.

const PASSWORD_MIN_LENGTH = 8;
const PASSWORD_MAX_LENGTH = 100;
const NAME_MAX_LENGTH = 100;

export const emailSchema = z
  .string()
  .min(1, 'Email is required')
  .pipe(z.email('Invalid email format'));

export const passwordSchema = z
  .string()
  .min(PASSWORD_MIN_LENGTH, `Minimum ${PASSWORD_MIN_LENGTH} characters`)
  .max(PASSWORD_MAX_LENGTH, `Maximum ${PASSWORD_MAX_LENGTH} characters`)
  .regex(/[a-zA-Z]/, 'Must contain at least one letter')
  .regex(/\d/, 'Must contain at least one number');

export const nameSchema = z.string().max(NAME_MAX_LENGTH, `Maximum ${NAME_MAX_LENGTH} characters`);

export const updateProfileSchema = z.object({
  name: nameSchema,
});

export const changePasswordSchema = z.object({
  currentPassword: z.string().min(1, 'Current password is required'),
  newPassword: z.string().min(1, 'New password is required').pipe(passwordSchema),
});

export const deleteAccountSchema = z.object({
  password: z.string().min(1, 'Password is required'),
});
