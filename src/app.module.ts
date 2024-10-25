import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { TableController } from './table/table.controller';
import { TableModule } from './table/table.module';
import { RedisController } from './redis/redis.controller';
import { RedisModule } from './redis/redis.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    PrismaModule,
    UserModule,
    TableModule,
    RedisModule,
  ],
  controllers: [AppController, TableController, RedisController],
  providers: [AppService],
})
export class AppModule {}
