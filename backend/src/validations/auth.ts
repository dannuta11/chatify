import * as z from 'zod';

export const LoginSchema = z.object({
  email: z.email().trim(),
  password: z
    .string()
    .min(6, 'Password must be at least 6 characters long')
    .max(100, 'Password must be at most 100 characters long')
    .trim(),
});

export const RegisterSchema = z.object({
  email: z.email().trim(),
  username: z
    .string()
    .min(3, 'Username must be at least 3 characters long')
    .max(30, 'Username must be at most 30 characters long')
    .trim(),
  password: z
    .string()
    .min(6, 'Password must be at least 6 characters long')
    .max(100, 'Password must be at most 100 characters long')
    .trim(),
});
