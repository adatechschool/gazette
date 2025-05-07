import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService, verifyPassword } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(
    username: string,
    pass: string,
  ): Promise<{ access_token: string }> {
    const user = await this.usersService.findOne(username);
    const isPasswordValid = await verifyPassword(pass, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException();
    } else {
      const payload = { sub: user.id, username: user.pseudo };
      return {
        access_token: await this.jwtService.signAsync(payload),
      };
    }
  }

  async login(
    email: string,
    password: string,
  ): Promise<{ access_token: string }> {
    const user = await this.usersService.findOne(email);
    const isPasswordValid = await verifyPassword(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException();
    } else {
      const payload = { sub: user.id, email: user.email };
      return { access_token: await this.jwtService.signAsync(payload) };
    }
  }
}
