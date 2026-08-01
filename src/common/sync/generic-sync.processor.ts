import { Injectable, Logger } from '@nestjs/common';

import { SyncProcessorOptions } from './sync-processor-options';
import { SyncProcessorResult } from './sync-processor-result';

@Injectable()
export class GenericSyncProcessor {
  private readonly logger = new Logger(GenericSyncProcessor.name);

  async execute<TOracle, TEntity>(
    options: SyncProcessorOptions<TOracle, TEntity>,
  ): Promise<SyncProcessorResult> {
    let inserted = 0;
    let updated = 0;
    let failed = 0;

    const startedAt = Date.now();

    for (const item of options.items) {
      try {
        const oracleId = options.getOracleId(item);

        const exists = await options.repository.findByOracleId(
          oracleId,
        );

        const entity = options.mapper(item);

        await options.repository.upsert(entity);

        if (exists) {
          updated++;
        } else {
          inserted++;
        }
      } catch (error) {
        failed++;

        this.logger.error(
          'Synchronization failed.',
          error instanceof Error ? error.stack : undefined,
        );
      }
    }

    return {
      total: options.items.length,
      inserted,
      updated,
      failed,
      durationMs: Date.now() - startedAt,
    };
  }
}