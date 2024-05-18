import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Habilitar el registro de errores detallados en desarrollo
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();

  await app.listen(3000);
}
bootstrap();
