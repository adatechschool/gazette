import { IsEmail, IsString, MinLength } from 'class-validator';

// DTO pour la création d'un utilisateur
export class CreateUserDto {
  @IsString()
  @MinLength(2)
  firstName!: string;

  @IsString()
  @MinLength(2)
  lastName!: string;

  @IsEmail()
  email!: string;

  @IsString()
  @MinLength(6)
  password!: string;
}

// DTO pour la mise à jour d'un utilisateur (tous les champs sont optionnels)
export class UpdateUserDto implements Partial<CreateUserDto> {
  @IsString()
  @MinLength(2)
  firstName?: string;

  @IsString()
  @MinLength(2)
  lastName?: string;

  @IsEmail()
  email?: string;
}

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
