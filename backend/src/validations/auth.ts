import * as z from 'zod';

export const LoginSchema = z.object({
  email: z.email().trim(),
  password: z.string().min(6).max(100).trim(),
});

export const RegisterSchema = z.object({
  email: z.email().trim(),
  username: z.string().min(3).max(30).trim(),
  password: z.string().min(6).max(100).trim(),
});
