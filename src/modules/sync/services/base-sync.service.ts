import { Logger } from '@nestjs/common';

import { SyncSummaryDto } from '../dto/sync-summary.dto';

export abstract class BaseSyncService {
  protected readonly logger = new Logger(this.constructor.name);

  /**
   * Create initial synchronization summary.
   */
  protected createSummary(): SyncSummaryDto {
    return {
      total: 0,
      inserted: 0,
      updated: 0,
      failed: 0,
      durationMs: 0,
    };
  }

  /**
   * Mark a successful insert.
   */
  protected inserted(summary: SyncSummaryDto): void {
    summary.inserted++;
    summary.total++;
  }

  /**
   * Mark a successful update.
   */
  protected updated(summary: SyncSummaryDto): void {
    summary.updated++;
    summary.total++;
  }

  /**
   * Mark a failed record.
   */
  protected failed(summary: SyncSummaryDto, error?: unknown): void {
    summary.failed++;
    summary.total++;

    if (error) {
      this.logger.error(error);
    }
  }

  /**
   * Execute one synchronization task safely.
   */
  protected async execute(
    summary: SyncSummaryDto,
    task: () => Promise<void>,
  ): Promise<void> {
    try {
      await task();
    } catch (error) {
      this.failed(summary, error);
    }
  }

  /**
   * Finish synchronization.
   */
  protected finish(startedAt: number, summary: SyncSummaryDto): SyncSummaryDto {
    summary.durationMs = Date.now() - startedAt;

    this.logger.log(
      [
        `Total=${summary.total}`,
        `Inserted=${summary.inserted}`,
        `Updated=${summary.updated}`,
        `Failed=${summary.failed}`,
        `Duration=${summary.durationMs} ms`,
      ].join(' | '),
    );

    return summary;
  }
}
