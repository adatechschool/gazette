import { api } from '../config';
import { CreateUserDto, UserProfileDto } from '@gazette/shared';

export async function createUser(user: CreateUserDto): Promise<CreateUserDto> {
	return await api
		.post('users', { json: user }).json();
}

export async function getAllUsers(): Promise<CreateUserDto[]> {
	return await api
		.get('users').json();
}

export async function login(
	email: string,
	password: string,
): Promise<{ message: string }> {
	return await api
		.post('auth/login', {
			json: { email, password },
		})
		.json();
}

export async function getUserProfile(): Promise<UserProfileDto> {
	return await api
		.get('auth/profile').json();
}

export async function deleteUserAccount(): Promise<void> {
	return await api
		.delete('users/me')
		.json();
}
