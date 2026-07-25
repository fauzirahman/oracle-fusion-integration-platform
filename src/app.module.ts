import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { PrismaModule } from './database/prisma.module';
import { HealthModule } from './modules/health/health.module';
import { validationSchema } from './config/env.validation';
import { OracleModule } from './modules/oracle/oracle.module';
import { SystemModule } from './modules/system/system.module';
import configuration from './config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      validationSchema,
    }),
    PrismaModule,
    HealthModule,
    OracleModule,
    SystemModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
