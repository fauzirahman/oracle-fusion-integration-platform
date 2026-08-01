import { Injectable, Logger } from '@nestjs/common';

import { SyncSummaryDto } from '../dto/sync-summary.dto';
import { SyncLogRepository } from '../repositories/sync-log.repository';

export interface SyncEngineOptions {
  entity: string;
  operation: string;
  throwOnError?: boolean;
}

@Injectable()
export class SyncEngineService {
  private readonly logger = new Logger(SyncEngineService.name);

  constructor(
    private readonly syncLogRepository: SyncLogRepository,
  ) {}

  async run(
    options: SyncEngineOptions,
    callback: () => Promise<SyncSummaryDto>,
  ): Promise<SyncSummaryDto> {
    const startedAt = Date.now();

    this.logger.log(
      `[${options.entity}] synchronization started.`,
    );

    const log = await this.syncLogRepository.createStart(
      options.entity,
      options.operation,
    );

    try {
      const summary = await callback();

      summary.durationMs = Date.now() - startedAt;

      await this.syncLogRepository.finishSuccess(log.id, {
        total: summary.total,
        duration: summary.durationMs,
        message: [
          `Inserted=${summary.inserted}`,
          `Updated=${summary.updated}`,
          `Failed=${summary.failed}`,
        ].join(' | '),
      });

      this.logger.log(
        [
          `[${options.entity}] synchronization completed`,
          `total=${summary.total}`,
          `inserted=${summary.inserted}`,
          `updated=${summary.updated}`,
          `failed=${summary.failed}`,
          `duration=${summary.durationMs}ms`,
        ].join(' '),
      );

      return summary;
    } catch (error) {
      await this.syncLogRepository.finishFailed(
        log.id,
        error instanceof Error
          ? error.message
          : 'Unknown synchronization error',
      );

      this.logger.error(
        `[${options.entity}] synchronization failed`,
        error instanceof Error ? error.stack : undefined,
      );

      if (options.throwOnError ?? true) {
        throw error;
      }

      return {
        total: 0,
        inserted: 0,
        updated: 0,
        failed: 0,
        durationMs: Date.now() - startedAt,
      };
    }
  }
}