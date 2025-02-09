import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, VersioningType } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Habilitar CORS
  app.enableCors({
    origin: process.env.URLFRONT,  // Permite solo solicitudes desde localhost:3001
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type, Authorization', 
    credentials: true, 
  });

  app.enableVersioning({
    type: VersioningType.URI,
    prefix: '/',
  });

  app.useGlobalPipes(new ValidationPipe());
  const port = process.env.PORT||3000;
  await app.listen(port);
}
bootstrap();
