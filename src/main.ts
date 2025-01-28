import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    whitelist: true
  }))
  app.enableCors({
    origin: [
      process.env.CLIENT, 
      process.env.WWW_CLIENT
    ],
    credentials: true
  })
  app.use(cookieParser());
  await app.listen(8080);
}
bootstrap();