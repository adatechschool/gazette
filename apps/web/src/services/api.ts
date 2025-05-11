import { api } from '../../config';
import { CreateUserDto } from '@gazette/shared';

export async function createUser(user: CreateUserDto): Promise<CreateUserDto> {
	return await api.post('users', { json: user }).json();
}

export async function getAllUsers(): Promise<CreateUserDto[]> {
	return await api.get('users').json();
}

interface LoginResponse {
	access_token: string;
	message: string;
}

export async function login(
	email: string,
	password: string,
): Promise<LoginResponse> {
	const response = await api
		.post('auth/login', {
			json: { email, password },
		})
		.json<LoginResponse>();

	if (response.access_token) {
		localStorage.setItem('token', response.access_token);
	}
	return response;
}

export async function logout() {
	await api.post('auth/logout');
	localStorage.removeItem('token');
}

export async function deleteUserAccount(): Promise<void> {
	return await api
		.delete('users/me', {
			credentials: 'include',
		})
		.json();
}
