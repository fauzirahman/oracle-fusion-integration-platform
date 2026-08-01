import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';

import { EmployeeSyncService } from './services/employee-sync.service';

@Injectable()
export class SyncScheduler {
  private readonly logger = new Logger(SyncScheduler.name);

  constructor(
    private readonly employeeSyncService: EmployeeSyncService,
  ) {}

  /**
   * Run every 15 minutes.
   *
   * Cron format:
   * second minute hour day month weekday
   */
  @Cron('0 */15 * * * *')
  async syncEmployees(): Promise<void> {
    this.logger.log('Employee synchronization started.');

    try {
      const result = await this.employeeSyncService.sync();

      this.logger.log(
        [
          'Employee synchronization completed.',
          `Total=${result.total}`,
          `Inserted=${result.inserted}`,
          `Updated=${result.updated}`,
          `Failed=${result.failed}`,
          `Duration=${result.durationMs} ms`,
        ].join(' '),
      );
    } catch (error) {
      this.logger.error(
        'Employee synchronization failed.',
        error instanceof Error ? error.stack : undefined,
      );
    }
  }
}