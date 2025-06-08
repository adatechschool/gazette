import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService, verifyPassword } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { LoginDto } from '@gazette/shared';
import { Response } from 'express';

@Injectable()
export class AuthService {
	constructor(
		private usersService: UsersService,
		private jwtService: JwtService,
		private configService: ConfigService,
	) { }

	async login(loginDto: LoginDto): Promise<{ access_token: string }> {
		try {
			const user = await this.usersService.findOne(loginDto.email);
			if (!user) {
				throw new UnauthorizedException('Invalid credentials');
			}

			const isPasswordValid = await verifyPassword(
				loginDto.password,
				user.password,
			);
			if (!isPasswordValid) {
				throw new UnauthorizedException('Invalid credentials');
			}

			const payload = { sub: user.id, email: user.email, pseudo: user.pseudo, role: user.role };
			return {
				access_token: await this.jwtService.signAsync(payload, {
					secret: this.configService.get('JWT_SECRET'),
				}),
			};
		} catch (error) {
			if (error instanceof UnauthorizedException) {
				throw error;
			}
			throw new UnauthorizedException('Authentication failed');
		}
	}

	async logout(res: Response): Promise<void> {
		res.clearCookie('token', {
			httpOnly: true,
			secure: process.env.NODE_ENV === 'production',
			sameSite: 'strict',
		});
	}
}
