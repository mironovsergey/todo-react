import { z } from 'zod';
import { emailSchema, nameSchema, passwordSchema } from '@/schemas/user';

export const signUpSchema = z.object({
  name: nameSchema,
  email: emailSchema,
  password: z.string().min(1, 'Password is required').pipe(passwordSchema),
});

export const signInSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, 'Password is required'),
});
