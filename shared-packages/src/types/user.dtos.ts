import { z } from 'zod';
import { CreateUserSchema } from './user.zods';

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

export type CreateUserDto = z.infer<typeof CreateUserSchema>;
