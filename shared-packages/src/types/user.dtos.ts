import { z } from 'zod';
import { CreateUserSchema } from './user.zods';

export interface UserDto {
	pseudo: string;
	email: string;
	password: string;
	createdAt?: Date;
}

export type CreateUserDto = z.infer<typeof CreateUserSchema>;
