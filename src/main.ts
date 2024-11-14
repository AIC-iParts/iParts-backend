import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, BadRequestException } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      exceptionFactory: (errors) => {
        const errorMessages = errors.map(
          (err) => `${err.property} - ${Object.values(err.constraints).join(', ')}`
        ).join('; ');

        // Lança uma BadRequestException para capturar o erro de validação
        return new BadRequestException(`Validation failed: ${errorMessages}`);
      },
    }),
  );

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
