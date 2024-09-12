import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}
  findUserById(id: string) {
    return this.prisma.user.findUnique({
      where: {
        id: id,
      },
    });
  }
  findUserByEmail(email: string) {
    return this.prisma.user.findFirst({
      where: {
        email: email,
      },
    });
  }
  createUser(data: Prisma.UserUncheckedCreateInput) {
    return this.prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: data.password,
      },
    });
  }
  updateUserAdmin(id: string, data: Prisma.UserUncheckedUpdateInput) {
    return this.prisma.user.update({
      where: {
        id: id,
      },
      data: {
        name: data.name,
        email: data.email,
        password: data.password,
      },
    });
  }
  updateUser(id: string, data: Prisma.UserUncheckedUpdateInput) {
    return this.prisma.user.update({
      where: {
        id: id,
      },
      data: {
        name: data.name,
        password: data.password,
      },
    });
  }
}
