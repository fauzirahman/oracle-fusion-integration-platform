import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { PrismaModule } from './database/prisma.module';
import { HealthModule } from './modules/health/health.module';
import { validationSchema } from './config/env.validation';
import { OracleModule } from './modules/oracle/oracle.module';
import { SystemModule } from './modules/system/system.module';
import configuration from './config/configuration';
import { EmployeesModule } from './modules/employees/employees.module';
import { ScheduleModule } from '@nestjs/schedule';
import { SyncModule } from './modules/sync/sync.module';
import { DepartmentsModule } from './modules/departements/departments.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      validationSchema,
    }),

    ScheduleModule.forRoot(),

    PrismaModule,

    OracleModule,

    HealthModule,
    SystemModule,

    EmployeesModule,
    DepartmentsModule,
    SyncModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
