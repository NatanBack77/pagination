import {
  Controller,
  Get,
  HttpStatus,
  HttpCode,
  Request,
  UseGuards,
  Body,
  Post,
  BadRequestException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { UserAuth } from './dtos/user.dtos';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}

  @HttpCode(HttpStatus.OK)
  @Post()
  async signIn(@Body() userDto: UserAuth) {
    console.log('userDto', userDto);
    const validator = await this.userService.findUserByEmail(userDto.email);
    if (!validator) {
      throw new BadRequestException('usuário ou senha incorreta');
    }
    const isEqualPassword = await bcrypt.compare(
      userDto.password,
      validator.password,
    );

    if (!isEqualPassword) {
      throw new BadRequestException('usuário ou senha incorreta');
    }

    const token = await this.authService.generateToken({ sub: userDto.id });
    return { access_token: token };
  }

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Get('/me')
  async me(@Request() req): Promise<any> {
    const userIdentify = await this.userService.findUserById(req.user.sub);
    const User = {
      id: userIdentify.id,
      name: userIdentify.name,
      email: userIdentify.email,
      user_Role: userIdentify.user_Role,
    };
    return User;
  }
}
