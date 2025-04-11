// import { Body, Controller, Get, Post } from '@nestjs/common';
// import { UsersService } from './user.service';

// @Controller('users')
// export class UsersController {
//   constructor(private usersService: UsersService) {}
//   @Post()
//   async create(
//     @Body() body: { pseudo: string; email: string; password: string },
//   ) {
//     const user = body;
//     const newUser = await this.usersService.create(user);
//     return newUser;
//   }
//   @Get()
//   async getAll() {
//     const users = await this.usersService.getAll();
//     return users;
//   }
// }
