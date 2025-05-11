import { z } from 'zod';
import type { LoginDto, ProfileResponseDto, UserDto } from '../dto/user.dto';

/**
 * Password validation regex
 * Must contain at least:
 * - One uppercase letter
 * - One lowercase letter
 * - One number
 * - One special character
 * - Minimum 8 characters
 */
const passwordValidation = new RegExp(
	/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*()-]).{8,}$/,
);

/**
 * User creation schema
 */
export const CreateUserSchema = z
	.object({
		pseudo: z.string().min(2, { message: 'must be at least 2 characters' }),
		email: z.string().email(),
		password: z
			.string()
			.min(8, { message: 'must contains at least 8 characters' })
			.regex(passwordValidation),
		confirmPassword: z
			.string()
			.min(8, { message: 'must contains at least 8 characters' })
			.regex(passwordValidation),
	})
	.refine((values) => values.password === values.confirmPassword, {
		message: 'Passwords must match!',
		path: ['confirmPassword'],
	});

/**
 * Login schema
 */
export const LoginSchema = z.object({
	email: z.string().email(),
	password: z.string().min(6),
});

/**
 * Profile response schema
 */
export const ProfileResponseSchema = z.object({
	id: z.string(),
	email: z.string().email(),
});

// Type inference from schemas
export type CreateUserSchemaType = z.infer<typeof CreateUserSchema>;
export type LoginSchemaType = z.infer<typeof LoginSchema>;
export type ProfileResponseSchemaType = z.infer<typeof ProfileResponseSchema>;
