import {
	Body,
	Controller,
	Get,
	Res,
	Req,
	HttpCode,
	HttpStatus,
	Post,
	UseGuards,
	UnauthorizedException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { LoginDto } from '@gazette/shared';

interface RequestWithUser extends Request {
	user: {
		sub: string;
		email: string;
		role: string;
	};
}

@Controller('auth')
export class AuthController {
	constructor(private authService: AuthService) {}

	@HttpCode(HttpStatus.OK)
	@Post('login')
	async login(
		@Body() loginDto: LoginDto,
		@Res({ passthrough: true }) res: Response,
	) {
		const token = await this.authService.login(loginDto);

		res.cookie('token', token.access_token, {
			httpOnly: true,
			secure: process.env.NODE_ENV === 'production',
			sameSite: 'strict',
			maxAge: 1000 * 60 * 60 * 24, // 1 jour
		});

		return { message: 'Connexion réussie' };
	}

	@UseGuards(AuthGuard)
	@Post('logout')
	async logout(@Res({ passthrough: true }) res: Response) {
		await this.authService.logout(res);
		return { message: 'Déconnexion réussie' };
	}

	@UseGuards(AuthGuard)
	@Get('profile')
	async getProfile(@Req() req: RequestWithUser) {
		return {
			message: 'Profile OK',
			user: req.user,
		};
	}
}
