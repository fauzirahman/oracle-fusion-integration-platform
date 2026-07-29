import { Module } from '@nestjs/common';

import { SyncService } from './sync.service';
import { EmployeeSyncJob } from './jobs/employee-sync.job';

import { OracleModule } from '../oracle/oracle.module';
import { PrismaModule } from '../../database/prisma.module';

@Module({
  imports: [OracleModule, PrismaModule],
  providers: [SyncService, EmployeeSyncJob],
})
export class SyncModule {}
