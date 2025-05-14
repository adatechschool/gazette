// import { CreateUserSchemaType } from '../schema/user.schema';
import { z } from 'zod';

/**
 * JWT related DTOs
 */
export interface JwtPayload {
	sub: string;
	email: string;
}

/**
 * User profile related DTOs
 */
export interface ProfileResponseDto {
	id: string;
	email: string;
}

export interface UserDto {
	pseudo: string;
	email: string;
	password: string;
	createdAt?: Date;
}

/**
 * Authentication related DTOs
 */
export interface LoginResponseDto {
	access_token: string;
	message: string;
}

export interface SignInDto {
	pseudo: string;
	password: string;
}

export interface LoginDto {
	email: string;
	password: string;
}

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
export type CreateUserDto = z.infer<typeof CreateUserSchema>;
