import { Injectable, Logger } from '@nestjs/common';

import { SyncSummaryDto } from '../../modules/sync/dto/sync-summary.dto';
import { SyncUpsertRepository } from './sync-upsert.repository';

export interface GenericSyncOptions<TOracle, TEntity> {
  items: TOracle[];

  repository: SyncUpsertRepository<TEntity>;

  mapper: (item: TOracle) => TEntity;

  getOracleId: (item: TOracle) => string;
}

@Injectable()
export class GenericSyncProcessor {
  private readonly logger = new Logger(GenericSyncProcessor.name);

  async execute<TOracle, TEntity>(
    options: GenericSyncOptions<TOracle, TEntity>,
  ): Promise<SyncSummaryDto> {
    let inserted = 0;

    let updated = 0;

    let failed = 0;

    for (const item of options.items) {
      try {
        const oracleId = options.getOracleId(item);

        const existing = await options.repository.findByOracleId(oracleId);

        const entity = options.mapper(item);

        await options.repository.upsert(entity);

        if (existing) {
          updated++;
        } else {
          inserted++;
        }
      } catch (error) {
        failed++;

        this.logger.error(
          error instanceof Error ? error.message : 'Synchronization failed',
        );
      }
    }

    const summary: SyncSummaryDto = {
      total: options.items.length,
      inserted,
      updated,
      failed,
      durationMs: 0,
    };

    return summary;
  }
}
