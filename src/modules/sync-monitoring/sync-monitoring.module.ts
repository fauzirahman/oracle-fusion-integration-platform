import { Module } from '@nestjs/common';

import { SyncModule } from '../sync/sync.module';

import { SyncMonitoringController } from './sync-monitoring.controller';
import { SyncMonitoringService } from './sync-monitoring.service';

@Module({
  imports: [SyncModule],
  controllers: [SyncMonitoringController],
  providers: [SyncMonitoringService],
})
export class SyncMonitoringModule {}