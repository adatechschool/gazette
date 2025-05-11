/**
 * JWT related DTOs
 */
export interface JwtPayload {
	sub: string;
	email: string;
}

/**
 * User profile related DTOs
 */
export interface ProfileResponseDto {
	id: string;
	email: string;
}

export interface UserDto {
	pseudo: string;
	email: string;
	password: string;
	createdAt?: Date;
}

/**
 * Authentication related DTOs
 */
export interface LoginResponseDto {
	access_token: string;
	message: string;
}

export interface SignInDto {
	pseudo: string;
	password: string;
}

export interface LoginDto {
	email: string;
	password: string;
}
