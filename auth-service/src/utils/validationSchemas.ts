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
      .max(16, 'Password must be at most 64 characters'),
  }),
});

export const userOtpSchema = z.object({
  body: z.object({
    email: z
      .string({
        required_error: 'Email is required',
      })
      .email('Not a valid email'),
    otp: z
      .string({
        required_error: 'OTP is required',
      })
      .max(4, 'OTP must be 4 characters'),
  }),
});

export const userSignInSchema = z.object({
  body: z.object({
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
