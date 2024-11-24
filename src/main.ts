import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, VersioningType } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable versioning with URI type (e.g., /v1/endpoint)
  app.enableVersioning({
    type: VersioningType.URI,
  });

  // Enable global validation pipes for DTO validation
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Automatically strip unrecognized properties
      forbidNonWhitelisted: true, // Throw errors for unrecognized properties
      transform: true, // Transform payloads to DTO classes
    }),
  );

  // Start the application
  await app.listen(3000);
}
bootstrap();
