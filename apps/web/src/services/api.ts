import { api } from '../../config';
import { CreateUserDto } from './dtos';

export async function createUser(): Promise<CreateUserDto> {
	return await api.post('users').json();
}

export async function getAllUsers(): Promise<CreateUserDto> {
	return await api.get('users').json();
}

// export async function createPlayer(name: string): Promise<PlayerDto> {
// 	return await api.post('players', { json: { name } }).json()
//   }
