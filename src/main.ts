import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // CORS configuration
  const allowedOrigins = [
    'http://localhost:3000',
    'https://oracle-fusion-integration-dashboard.vercel.app',
    'https://oracle-fusion-integration-platform-production-755e.up.railway.app',
  ];

  app.enableCors({
    origin: allowedOrigins,
    methods: [
      'GET',
      'HEAD',
      'PUT',
      'PATCH',
      'POST',
      'DELETE',
      'OPTIONS',
    ],
    allowedHeaders: [
      'Content-Type',
      'Authorization',
    ],
    credentials: false,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  app.useGlobalFilters(new HttpExceptionFilter());

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Oracle Fusion Integration Platform')
    .setDescription(
      'Enterprise REST API for Oracle Fusion Cloud Integration',
    )
    .setVersion('1.0.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(
    app,
    swaggerConfig,
  );

  SwaggerModule.setup('api', app, document);

  const port = Number(process.env.PORT) || 3000;

  await app.listen(port, '0.0.0.0');

  const logger = new Logger('Bootstrap');

  logger.log(
    `Application running on http://localhost:${port}`,
  );

  logger.log(
    `Swagger available at http://localhost:${port}/api`,
  );
}

bootstrap();