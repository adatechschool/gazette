import { api } from '../../config';
import { CreateUserDto } from '@gazette/shared';

export async function createUser(user: CreateUserDto): Promise<CreateUserDto> {
	return await api.post('users', { json: user }).json();
}

export async function getAllUsers(): Promise<CreateUserDto[]> {
	return await api.get('users').json();
}

export async function login(
	email: string,
	password: string,
): Promise<{ message: string }> {
	try {
		return await api
			.post('auth/login', {
				json: { email, password },
			})
			.json();
	} catch (error: any) {
		const message =
			(await error.response?.json().then((r) => r.message)) ||
			'Erreur inconnue';
		throw new Error(message);
	}
}

export async function deleteUserAccount(): Promise<void> {
	return await api.delete('users/me', {
		credentials: 'include',
	}).json()
}
