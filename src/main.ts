import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from "dotenv";
import * as cors from "cors";
import { ValidationPipe } from '@nestjs/common';
async function bootstrap() {
  dotenv.config()
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe())
  await app.enableCors();
  await app.listen(3000);
}
bootstrap();
