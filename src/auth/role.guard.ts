import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { ROLES_KEY } from 'src/auth/roles.decorator';
import { UserType } from 'src/auth/user-type.enum';
import { Request } from 'express';
import { UserService } from 'src/user/user.service';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private jwtService: JwtService,
    private userService: UserService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const { authorization } = request.headers;

    if (!authorization) {
      throw new UnauthorizedException('Authorization header not found');
    }

    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException('Token not found');
    }

    const requiredRoles = this.reflector.getAllAndOverride<UserType[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );

    const payload = await this.jwtService
      .verifyAsync(token, {
        secret: process.env.JWT_SECRET,
      })
      .catch(() => {
        throw new UnauthorizedException('Invalid token');
      });

    if (!payload) return false;

    const user = await this.userService.findUserById(String(payload.sub));
    if (!user) {
      throw new UnauthorizedException();
    }

    if (!requiredRoles) {
      return true;
    }

    const verify = requiredRoles.some((role) => role === user.user_Role);
    if (verify !== true) {
      throw new UnauthorizedException();
    }
    return verify;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
