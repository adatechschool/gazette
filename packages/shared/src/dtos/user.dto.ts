// Interface pour la représentation d'un utilisateur (response)
export interface UserResponse {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface LoginDto {
	email: string;
	password: string;
}

export interface UserProfileDto {
	message: string;
	user: {
		sub: string;
		email: string;
		role: string;
	};
}
