import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService, verifyPassword } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';

//logique d'autenfication de l'app

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(credentials: {
    email: string;
    password: string;
  }): Promise<{ access_token: string }> {
    const user = await this.usersService.findOne(credentials.email);
    const isPasswordValid = await verifyPassword(
      credentials.password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { sub: user.id, email: user.email };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
