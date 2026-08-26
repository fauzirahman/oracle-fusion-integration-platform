import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // =========================================================
  // CORS CONFIGURATION
  // =========================================================

  const allowedOrigins = [
    'http://localhost:3000',
    'https://oracle-fusion-integration-dashboard.vercel.app',
    'https://oracle-fusion-integration-platform-production-755e.up.railway.app',
  ];

  app.enableCors({
    origin: (origin, callback) => {
      // Allow requests without Origin header
      // such as curl and server-to-server requests.
      if (!origin) {
        return callback(null, true);
      }

      const isAllowed =
        allowedOrigins.includes(origin) ||
        /^https:\/\/oracle-fusion-integration-dashboard.*\.vercel\.app$/.test(
          origin,
        );

      if (isAllowed) {
        return callback(null, true);
      }

      return callback(new Error(`Not allowed by CORS: ${origin}`), false);
    },

    methods: [
      'GET',
      'HEAD',
      'PUT',
      'PATCH',
      'POST',
      'DELETE',
      'OPTIONS',
    ],

    allowedHeaders: ['Content-Type', 'Authorization'],

    credentials: false,
  });

  // =========================================================
  // GLOBAL VALIDATION
  // =========================================================

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

  // =========================================================
  // GLOBAL HTTP EXCEPTION FILTER
  // =========================================================

  app.useGlobalFilters(new HttpExceptionFilter());

  // =========================================================
  // SWAGGER / OPENAPI
  // =========================================================

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Oracle Fusion Integration Platform')
    .setDescription(
      'Enterprise REST API for Oracle Fusion Cloud Integration',
    )
    .setVersion('1.0.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        description: 'Enter JWT access token',
      },
      'access-token',
    )
    .build();

  const document = SwaggerModule.createDocument(
    app,
    swaggerConfig,
  );

  SwaggerModule.setup('api', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  });

  // =========================================================
  // SERVER
  // =========================================================

  const port = Number(process.env.PORT) || 3000;

  await app.listen(port, '0.0.0.0');

  // =========================================================
  // BOOTSTRAP LOGGING
  // =========================================================

  const logger = new Logger('Bootstrap');

  logger.log(
    `Application running on http://localhost:${port}`,
  );

  logger.log(
    `Swagger available at http://localhost:${port}/api`,
  );
}

bootstrap();