import { UserRole } from '@gazette/shared'
import { Body, Controller, Delete, Get, Param, Post, Query, UseGuards } from '@nestjs/common'
import { Roles } from 'src/modules/roles/roles.decorator'
import { AuthGuard } from '../auth/auth.guard'
import { UsersService } from './user.service'

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) { }
  @Post()
  async create(
    @Body() body: { pseudo: string, email: string, password: string },
  ) {
    const user = body
    const newUser = await this.usersService.create(user)
    return newUser
  }

  @Get()
  async getAll() {
    const users = await this.usersService.getAll()
    return users
  }

  @Get('by-email')
  async findOne(@Query('email') email: string) {
    const user = await this.usersService.findOne(email)
    return user
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  @Roles(UserRole.ADMIN)
  async deleteUser(@Param('id') id: string) {
    await this.usersService.delete(id)
    return { message: 'User deleted successfully' }
  }
}
