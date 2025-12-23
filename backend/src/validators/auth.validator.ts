import { z } from 'zod';

// Password validation regex
const passwordRegex = {
  uppercase: /[A-Z]/,
  lowercase: /[a-z]/,
  number: /[0-9]/,
  special: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/,
};

// Custom password validator
const passwordValidator = z
  .string()
  .min(8, 'Password must be at least 8 characters')
  .refine(
    (password) => passwordRegex.uppercase.test(password),
    'Password must contain at least one uppercase letter'
  )
  .refine(
    (password) => passwordRegex.lowercase.test(password),
    'Password must contain at least one lowercase letter'
  )
  .refine(
    (password) => passwordRegex.number.test(password),
    'Password must contain at least one number'
  )
  .refine(
    (password) => passwordRegex.special.test(password),
    'Password must contain at least one special character'
  );

// Register schema
export const registerSchema = z.object({
  email: z.string().email('Invalid email format'),
  password: passwordValidator,
});

// Login schema
export const loginSchema = z.object({
  email: z.string().email('Invalid email format'),
  password: z.string().min(1, 'Password is required'),
});

// Refresh token schema
export const refreshSchema = z.object({
  refreshToken: z.string().min(1, 'Refresh token is required'),
});

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type RefreshInput = z.infer<typeof refreshSchema>;
