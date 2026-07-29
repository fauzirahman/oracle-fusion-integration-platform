import { Module } from '@nestjs/common';

import { OracleModule } from '../oracle/oracle.module';
import { PrismaModule } from '../../database/prisma.module';
import { EmployeesModule } from '../employees/employees.module';
import { SyncService } from './sync.service';

import { EmployeeSyncJob } from './jobs/employee-sync.job';

import { EmployeeSyncService } from './services/employee-sync.service';
import { DepartmentSyncService } from './services/department-sync.service';
import { DepartmentsModule } from '../departements/departments.module';
import { SyncController } from './controller/sync.controller';

@Module({
  imports: [OracleModule, PrismaModule, EmployeesModule, DepartmentsModule],
  controllers: [SyncController],
  providers: [
    SyncService,
    EmployeeSyncJob,
    EmployeeSyncService,
    DepartmentSyncService,
  ],
})
export class SyncModule {}
