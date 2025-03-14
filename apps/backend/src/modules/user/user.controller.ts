import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsersService } from './user.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}
  @Post()
  async create(
    @Body() body: { pseudo: string; email: string; password: string },
  ) {
    const { pseudo, email, password } = body;
    const newUser = await this.usersService.create(pseudo, email, password);
    return newUser;
  }
  @Get()
  async getAll() {
    const users = await this.usersService.getAll();
    return users;
  }
}
