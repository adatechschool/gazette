import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Query,
  Param,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './user.service';
import { AuthGuard } from '../auth/auth.guard';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}
  @UseGuards(AuthGuard)
  @Post()
  async create(
    @Body() body: { pseudo: string; email: string; password: string },
  ) {
    const user = body;
    const newUser = await this.usersService.create(user);
    return newUser;
  }
  @UseGuards(AuthGuard)
  @Get('users')
  async getAll() {
    const users = await this.usersService.getAll();
    return users;
  }
  @UseGuards(AuthGuard)
  @Get('user')
  async findOne(@Query('pseudo') pseudo: string) {
    const user = await this.usersService.findOne(pseudo);
    return user;
  }
  // @UseGuards(AuthGuard)
  // @Delete(':id')
  // async deleteUser(@Param('id') id: string) {
  //   await this.usersService.delete(id);
  //   return { message: 'User deleted successfully' };
  // }
}
