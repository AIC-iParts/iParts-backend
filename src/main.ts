import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe, BadRequestException } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('iParts API')
    //.setDescription('Descrição')
    .setVersion('1.0')
    //.addTag('iParts')
    .addBearerAuth()
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('doc', app, documentFactory);

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
  const port = process.env.PORT ?? 3000
  await app.listen(port);
  console.log(`Application running on port ${port}`);
}
bootstrap();
