import { CreateUser } from '@/components/custom/FormSignUpCC';
import { api } from '../../config';
import { CreateUserDto } from './dtos';

export async function createUser(user: CreateUser): Promise<CreateUserDto> {
	return await api.post('users', { json: user }).json();
}

export async function getAllUsers(): Promise<CreateUserDto> {
	return await api.get('users').json();
}

// export async function createPlayer(name: string): Promise<PlayerDto> {
// 	return await api.post('players', { json: { name } }).json()
//   }
