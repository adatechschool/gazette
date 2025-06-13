import type {
  CanActivate,
  ExecutionContext,
} from '@nestjs/common'
import type { JwtService } from '@nestjs/jwt'
import type { Request } from 'express'
import {
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest()
    const token = this.extractTokenFromRequest(request)
    if (!token) {
      throw new UnauthorizedException('No token provided')
    }
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET,
      })
      // 💡 We're assigning the payload to the request object here
      // so that we can access it in our route handlers
      request.user = payload
    }
    catch {
      throw new UnauthorizedException('Invalid token')
    }
    return true
  }

  private extractTokenFromRequest(request: Request): string | undefined {
    // Check Authorization header
    const authHeader = request.headers.authorization
    if (authHeader) {
      const [type, token] = authHeader.split(' ')
      if (type === 'Bearer')
        return token
    }

    // Check cookies
    const cookies = request.cookies
    if (cookies && cookies.token) {
      return cookies.token
    }

    return undefined
  }
}
