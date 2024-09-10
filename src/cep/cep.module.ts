import { Module } from '@nestjs/common';
import { CepController } from './cep.controller';
import { CepService } from './cep.service';
import { HttpModule } from '@nestjs/axios';
import { AuthService } from 'src/auth/auth.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  imports: [
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),
  ],
  controllers: [CepController],
  providers: [CepService, AuthService, PrismaService],
})
export class CepModule {}
