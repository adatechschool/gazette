import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsersService } from './user.service';
import { User } from '../../../../../packages/types/user.type';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}
  @Post()
  async create(@Body() createUserDto: User) {
    this.usersService.create(createUserDto);
  }
  @Get()
  async findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }
}
