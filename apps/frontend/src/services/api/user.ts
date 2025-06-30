import type { CreateUserDto, UserProfileDto } from '@gazette/shared'
import { api } from '../../config'

export async function createUser(user: CreateUserDto): Promise<CreateUserDto> {
  console.warn('Données envoyées à l’API :', user)
  try {
    const response = await api.post('users', { json: user })
    const data = await response.json()
    console.warn('Réponse backend :', data)
    return data as CreateUserDto
  }
  catch (error: any) {
    console.error('Erreur lors de la création utilisateur :', error)
    if (error.response) {
      const errorData = await error.response.json()
      console.error('Détail erreur backend :', errorData)
    }
    throw error
  }
}

export async function getAllUsers(): Promise<CreateUserDto[]> {
  return await api
    .get('users')
    .json()
}
export async function loginUser(
  email: string,
  password: string,
): Promise<{ message: string }> {
  return await api
    .post('auth/login', {
      json: { email, password },
    })
    .json()
}

export async function logoutUser(): Promise<void> {
  return await api
    .post('auth/logout')
    .json()
}

export async function getUserProfile(): Promise<UserProfileDto> {
  return await api
    .get('auth/profile')
    .json()
}

export async function deleteUserAccount(): Promise<void> {
  return await api
    .delete('users/me')
    .json()
}
