import {
  Controller,
  Get,
  HttpStatus,
  HttpCode,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { randomUUID } from 'node:crypto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Get()
  async signIn() {
    const user = {
      id: randomUUID(),
      name: this.authService.generateRandomLetters(5),
    };

    const token = await this.authService.generateToken({ sub: user.id });
    return { access_token: token, user_name: user.name };
  }

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Get('/me')
  async me(@Request() req): Promise<any> {
    return req.user;
  }
}
