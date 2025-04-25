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
import { UsersService } from '../user/user.service';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
  ) {}

  @HttpCode(HttpStatus.OK)
  @Post('signin')
  async signIn(
    @Body() signInDto: Record<string, any>,
    @Res({ passthrough: true }) res: Response,
  ) {
    const user = await this.usersService.findOne(signInDto.pseudo);
    if (!user) throw new UnauthorizedException();
    const token = await this.authService.signIn(
      signInDto.username,
      signInDto.password,
    );
    res.cookie('token', token.access_token, {
      httpOnly: true,
      secure: false, // true en prod
      sameSite: 'strict',
      maxAge: 1000 * 60 * 60 * 24, // 1 jour
    });
    return { message: 'login success' };
  }
  @UseGuards(AuthGuard)
  @Get('profile')
  async getProfile(@Req() req: Request) {
    const token = req.cookies['token'];
    if (!token) throw new UnauthorizedException('No token provided');
    return { message: 'Profile OK', token };
  }

  @Post('login') 
  async login(@Body () loginDto: LoginDto )
}


