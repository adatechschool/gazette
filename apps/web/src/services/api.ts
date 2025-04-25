import { api } from '../../config';
import { CreateUserDto } from '../../../../shared-packages/src/types/user.dtos';

export async function createUser(user: CreateUserDto): Promise<CreateUserDto> {
	return await api.post('users', { json: user }).json();
}

export async function getAllUsers(): Promise<CreateUserDto> {
	return await api.get('users').json();
}

export async function login(
	email: string,
	password: string,
): Promise<{ message: string }> {
	return await api
		.post('auth/login', {
			json: { email, password },
			credentials: 'include',
		})
		.json();
}
