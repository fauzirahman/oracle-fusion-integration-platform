import { Injectable, Logger } from '@nestjs/common';

import { Cron, CronExpression } from '@nestjs/schedule';

import { SyncService } from '../sync.service';

@Injectable()
export class EmployeeSyncJob {
  private readonly logger = new Logger(EmployeeSyncJob.name);

  constructor(private readonly syncService: SyncService) {}

  @Cron(CronExpression.EVERY_DAY_AT_2AM)
  async handle() {
    this.logger.log('Running employee sync job');

    await this.syncService.syncEmployees();
  }
}
