// Interface pour la représentation d'un utilisateur (response)
export interface UserResponse {
  id: string
  firstName: string
  lastName: string
  email: string
  createdAt: Date
  updatedAt: Date
}

export interface LoginDto {
  email: string
  password: string
}

// Représentation de l'utilisateur tel qu'il est retourné par l'API
export interface ApiUser {
  sub: string
  email: string
  pseudo: string
  role: string
}

export interface UserProfileDto {
  message: string
  user: ApiUser
}

export interface UserDto {
  id: string
  email: string
  pseudo: string
  role: 'user' | 'admin'
}

// Fonction utilitaire pour transformer ApiUser en UserDto
export function transformApiUserToUserDto(apiUser: ApiUser): UserDto {
  return {
    id: apiUser.sub,
    email: apiUser.email,
    pseudo: apiUser.pseudo,
    role: apiUser.role as 'user' | 'admin',
  }
}
