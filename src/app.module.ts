import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { CepModule } from './cep/cep.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), AuthModule, CepModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
