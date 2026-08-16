import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';

import { AppController } from './app.controller';

import { CommonModule } from './common/common.module';

import { validationSchema } from './config/env.validation';
import configuration from './config/configuration';

import { PrismaModule } from './database/prisma.module';

import { HealthModule } from './modules/health/health.module';
import { SystemModule } from './modules/system/system.module';
import { OracleModule } from './modules/oracle/oracle.module';

import { EmployeesModule } from './modules/employees/employees.module';
import { DepartmentsModule } from './modules/departments/departments.module';
import { SuppliersModule } from './modules/suppliers/suppliers.module';

import { SyncModule } from './modules/sync/sync.module';
import { SyncMonitoringModule } from './modules/sync-monitoring/sync-monitoring.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      validationSchema,
    }),

    CommonModule,

    ScheduleModule.forRoot(),

    PrismaModule,

    HealthModule,
    SystemModule,

    EmployeesModule,
    DepartmentsModule,
    SuppliersModule,

    SyncModule,
    SyncMonitoringModule,

    OracleModule,
  ],

  controllers: [AppController],
})
export class AppModule {}