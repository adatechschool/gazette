import { z } from 'zod';

export interface UserDto {
	pseudo: string;
	email: string;
	password: string;
	createdAt?: Date;
}

export interface SignInDto {
	pseudo: string;
	password: string;
}

export interface LoginDto {
	email: string;
	password: string;
}

export const LoginSchema = z.object({
	email: z.string().email(),
	password: z.string().min(6),
});

export const CreateUserSchema = z
	.object({
		pseudo: z.string().min(3),
		email: z.string().email(),
		password: z.string().min(6),
		confirmPassword: z.string().min(6),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: 'Les mots de passe ne correspondent pas',
		path: ['confirmPassword'],
	});

export type CreateUserDto = z.infer<typeof CreateUserSchema>;
