import { Module } from '@nestjs/common';

import { OracleModule } from '../oracle/oracle.module';
import { PrismaModule } from '../../database/prisma.module';
import { EmployeesModule } from '../employees/employees.module';
import { SyncService } from './sync.service';

import { EmployeeSyncJob } from './jobs/employee-sync.job';

import { EmployeeSyncService } from './services/employee-sync.service';
import { DepartmentSyncService } from './services/department-sync.service';
import { DepartmentsModule } from '../departments/departments.module';
import { SyncController } from './controller/sync.controller';
import { SyncLogRepository } from './repositories/sync-log.repository';
import { SyncEngineService } from './services/sync-engine.service';
import { SupplierSyncService } from './services/supplier-sync.service';
import { SuppliersModule } from '../suppliers/suppliers.module';
import { SyncLogService } from './services/sync-log.service';
import { GenericSyncProcessor } from 'src/common/sync/generic-sync.processor';
import { SyncScheduler } from './sync.scheduler';
import { SyncCoordinatorService } from './services/sync-coordinator.service';

@Module({
  imports: [
    OracleModule,
    PrismaModule,
    EmployeesModule,
    DepartmentsModule,
    SuppliersModule,
  ],
  controllers: [SyncController],
  providers: [
    SyncService,
    EmployeeSyncJob,
    EmployeeSyncService,
    DepartmentSyncService,
    SyncEngineService,
    SyncLogRepository,
    SupplierSyncService,
    SyncLogService,
    GenericSyncProcessor,
    SyncScheduler,
    SyncCoordinatorService,
  ],
})
export class SyncModule {}
