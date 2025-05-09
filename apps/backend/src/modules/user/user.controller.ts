import { Body, Controller, Delete, Get, Param, Post, Query } from '@nestjs/common';
import { UsersService } from './user.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}
  @Post()
  async create(
    @Body() body: { pseudo: string; email: string; password: string },
  ) {
    const user = body;
    const newUser = await this.usersService.create(user);
    return newUser;
  }
  @Get('users')
  async getAll() {
    const users = await this.usersService.getAll();
    return users;
  }
  @Get('user')
  async findOne(@Query('pseudo') pseudo: string) {
    const user = await this.usersService.findOne(pseudo);
    return user;
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    await this.usersService.delete(id);
    return { message: 'User deleted successfully' };
  }
}
