import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // const cors = ['*'];
  app.enableCors();
  app.useGlobalPipes();
  await app.listen(3000);
}
bootstrap();
