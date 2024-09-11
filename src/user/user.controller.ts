import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { GetIdUser, User } from './dtos/user.dtos';
import { Prisma, UserType } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { Roles } from 'src/auth/roles.decorator';
import { AuthGuard } from 'src/auth/auth.guard';
import { RolesGuard } from 'src/auth/role.guard';

@Controller('user')
export class UserController {
  private admin: string = 'ADMIN';
  private saltOrRounds: number = 10;

  constructor(private userservice: UserService) {}
  @HttpCode(HttpStatus.CREATED)
  @Post()
  async createUser(@Body() userDto: User) {
    const validator = await this.userservice.findUserByEmail(userDto.email);
    if (validator) {
      throw new BadRequestException('Email does exists');
    }
    const userCreate: Prisma.UserCreateInput = {
      name: userDto.name,
      email: userDto.email,
      password: await bcrypt.hash(userDto.password, this.saltOrRounds),
      user_Role: 'USER',
    };
    await this.userservice.createUser(userCreate);
  }
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(UserType.ADMIN, UserType.USER)
  @Put(':id')
  async updateUser(
    @Req() req,
    @Param() Param: GetIdUser,
    @Body() userDto: User,
  ) {
    const validator = await this.userservice.findUserById(Param.id);
    if (validator) {
      throw new BadRequestException('Email does exists');
    }
    if (req?.user?.user_Role === this.admin) {
      await this.userservice.updateUserAdmin(Param.id, userDto);
    }
    const User = {
      name: userDto.name,
      password: await bcrypt.hash(userDto.password, this.saltOrRounds),
    };
    await this.userservice.updateUser(Param.id, User);
  }
}
