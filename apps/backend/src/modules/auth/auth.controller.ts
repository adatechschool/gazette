import {
  Body,
  Controller,
  Get,
  Post,
  Res,
  Request,
  UseGuards,
  UnauthorizedException,
  Req,
} from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import {
  JwtPayload,
  LoginDto,
  LoginResponseDto,
  ProfileResponseDto,
} from '@gazette/shared';
import { AuthGuard } from './auth.guard';

interface RequestWithUser extends Request {
  user: JwtPayload;
}

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(
    @Body() loginDto: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<LoginResponseDto> {
    const token = await this.authService.login(loginDto);
    res.cookie('token', token.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 1000 * 60 * 60 * 24, // 24 heures
    });
    return { message: 'Login successful', access_token: token.access_token };
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Req() req: RequestWithUser): ProfileResponseDto {
    if (!req.user) {
      throw new UnauthorizedException('User not found');
    }
    const { sub, email } = req.user;
    return {
      id: sub,
      email: email,
    };
  }

  @Post('logout')
  @UseGuards(AuthGuard)
  async logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('token');
    return { message: 'Logout successful' };
  }
}
