import { z } from 'zod';

export const userRegisterSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: 'Full name is required',
    }),
    email: z
      .string({
        required_error: 'Email is required',
      })
      .email('Not a valid email'),
    password: z
      .string()
      .min(8, 'Password must be at least 8 characters')
      .max(64, 'Password must be at most 64 characters'),
  }),
});
