import { Module } from '@nestjs/common';
import { TableService } from './table.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { TableController } from './table.controller';
import { RedisService } from 'src/redis/redis.service';

@Module({
  providers: [TableService, PrismaService, RedisService],
  controllers: [TableController],
  exports: [TableService],
})
export class TableModule {}
