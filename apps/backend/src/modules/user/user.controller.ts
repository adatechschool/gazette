import { Controller, Post } from '@nestjs/common';
import { UsersService } from './user.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}
  @Post()
  async create() {
    const newUser = await this.usersService.create();
    return newUser;
  }
}
