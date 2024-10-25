import { BadRequestException, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { PageTableDTO } from './dtos/query-params-table.dto';

@Injectable()
export class TableService {
  private isOrderInverted = false;

  constructor(private prisma: PrismaService) {}

  async findAllTable(query: PageTableDTO) {
    const {
      orderByField = 'id',
      orderDirection = true,
      page = 0,
      size = 10,
    } = query;

    let finalOrderDirection: 'asc' | 'desc';

    if (this.isOrderInverted) {
      finalOrderDirection = orderDirection ? 'desc' : 'asc';
    } else {
      finalOrderDirection = orderDirection ? 'asc' : 'desc';
    }

    this.isOrderInverted = !this.isOrderInverted;

    const [response, totalItems] = await Promise.all([
      this.prisma.table.findMany({
        orderBy: {
          [orderByField]: finalOrderDirection,
        },
        take: size,
        skip: page * size,
      }),
      this.prisma.table.count(),
    ]);
    return {
      response,
      totalItems,
    };
  }
  async updateItemOfTheTable(
    id: number,
    data: Prisma.TableUncheckedUpdateInput,
  ) {
    return this.prisma.$transaction(async (prisma) => {
      const item = await prisma.table.findFirst({
        where: {
          id: id,
        },
      });
      if (!item) {
        throw new BadRequestException('Item não encontrado');
      }
      await prisma.table.update({
        where: {
          id: id,
        },
        data: {
          title: data.title,
          description: data.description,
        },
      });
    });
  }
  async deleteItemOfTheItem(id: number) {
    return this.prisma.$transaction(async (prisma) => {
      const result = await prisma.table.findFirst({
        where: {
          id: id,
        },
      });
      if (!result) {
        throw new BadRequestException('Item não encontrado');
      }
      await prisma.table.delete({
        where: {
          id: id,
        },
      });
    });
  }
}
