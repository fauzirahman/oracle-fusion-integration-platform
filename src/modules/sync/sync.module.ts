import { Module } from '@nestjs/common';

import { PrismaModule } from '../../database/prisma.module';
import { OracleModule } from '../oracle/oracle.module';

import { EmployeesModule } from '../employees/employees.module';
import { DepartmentsModule } from '../departments/departments.module';
import { SuppliersModule } from '../suppliers/suppliers.module';

import { SyncController } from './controller/sync.controller';

import { SyncCoordinatorService } from './services/sync-coordinator.service';
import { SyncEngineService } from './services/sync-engine.service';

import { EmployeeSyncService } from './services/employee-sync.service';
import { DepartmentSyncService } from './services/department-sync.service';
import { SupplierSyncService } from './services/supplier-sync.service';

import { SyncLogRepository } from './repositories/sync-log.repository';

import { GenericSyncProcessor } from '../../common/sync/generic-sync.processor';

@Module({
  imports: [
    PrismaModule,

    OracleModule,

    EmployeesModule,
    DepartmentsModule,
    SuppliersModule,
  ],

  controllers: [SyncController],

  providers: [
    SyncCoordinatorService,

    SyncEngineService,

    SyncLogRepository,

    GenericSyncProcessor,

    EmployeeSyncService,
    DepartmentSyncService,
    SupplierSyncService,
  ],

  exports: [SyncCoordinatorService, SyncEngineService, SyncLogRepository],
})
export class SyncModule {}
