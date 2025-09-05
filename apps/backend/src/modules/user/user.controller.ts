import { SubscriptionDto } from '@gazette/shared'
import { BadRequestException, Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post, Query, Req, Res, UseGuards } from '@nestjs/common'
import { Response } from 'express'
import { AuthGuard } from '../auth/auth.guard'
import { clearAuthCookie } from '../auth/auth.utils'
import { SubscriptionsService } from '../subscription/subscription.service'
import { UsersService } from './user.service'

interface RequestWithUser extends Request {
  user: {
    id: string
    email: string
    pseudo: string
  }
}

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService, private subscriptionsService: SubscriptionsService) { }

  @Post()
  async create(
    @Body() body: { pseudo: string, email: string, password: string },
  ) {
    const user = body
    const newUser = await this.usersService.create(user)
    return newUser
  }

  @Get()
  @UseGuards(AuthGuard)
  async getAll() {
    const users = await this.usersService.getAll()
    return users
  }

  @Get('by-email')
  @UseGuards(AuthGuard)
  async findOne(@Query('email') email: string) {
    const user = await this.usersService.findOne(email)
    return user
  }

  @UseGuards(AuthGuard)
  @Delete('me')
  async deleteCurrentUser(@Req() req: RequestWithUser, @Res({ passthrough: true }) res: Response) {
    await this.usersService.delete(req.user.id)
    clearAuthCookie(res)
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    await this.usersService.delete(id)
    return { message: 'User deleted successfully' }
  }

  @Get(':userId/subscriptions')
  @UseGuards(AuthGuard)
  async getUserSubscriptions(@Param('userId') userId: string, @Req() req: RequestWithUser): Promise<SubscriptionDto[]> {
    // Vérifier que l'utilisateur demande ses propres abonnements
    if (req.user.id !== userId) {
      throw new NotFoundException('Access denied')
    }
    const subscriptions = await this.subscriptionsService.findByUserId(userId)
    if (!subscriptions) {
      throw new NotFoundException('Subscriptions not found for user')
    }
    return subscriptions.map(subscription => ({
      id: subscription.id,
      userId: subscription.user.id,
      mediaId: subscription.media.id,
      createdAt: subscription.createdAt.toISOString(),
    }))
  }

  @UseGuards(AuthGuard)
  @Patch('me')
  async updateCurrentUser(
    @Req() req: RequestWithUser,
    @Body() body: { pseudo?: string; email?: string; password?: string },
  ) {
    try {
      // Validation basique
      if (!body || Object.keys(body).length === 0) {
        throw new NotFoundException('No data provided for update')
      }
      if (body.email && body.email !== req.user.email) {
        const existingUser = await this.usersService.findOne(body.email)
        if (existingUser && existingUser.id !== req.user.id) {
          throw new BadRequestException('Email already exists')
        }
      }

      console.log('Updating user:', req.user.id, 'with data:', body)
      const updatedUser = await this.usersService.update(req.user.id, body)
      
      if (!updatedUser) {
        throw new NotFoundException('User not found')
      }

      console.log('User updated successfully:', updatedUser)
      return updatedUser
    }
    catch (error) {
      console.error('Error updating user:', error)
      
      // Re-lancer les erreurs HTTP connues
      if (error instanceof NotFoundException) {
        throw error
      }
      
      // Pour les autres erreurs, logs détaillés
      console.error('Unexpected error during user update:', {
        userId: req.user.id,
        body,
        error: error.message,
        stack: error.stack
      })
      
      throw new NotFoundException('Failed to update user profile')
    }
  }
}
