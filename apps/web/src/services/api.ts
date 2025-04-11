import { api } from '../../config';
import { CreateUserDto } from '../../../../shared-packages/src/types/user.dtos';

export async function createUser(user: CreateUserDto): Promise<CreateUserDto> {
	return await api.post('users', { json: user }).json();
}

export async function getAllUsers(): Promise<CreateUserDto> {
	return await api.get('users').json();
}
