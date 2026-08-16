import { BadRequestException, Injectable } from '@nestjs/common';

import { SyncLogRepository } from '../sync/repositories/sync-log.repository';

import { SyncHistoryQueryDto } from './dto/sync-history-query.dto';

@Injectable()
export class SyncMonitoringService {
  private static readonly ENTITIES = [
    'Employee',
    'Department',
    'Supplier',
  ] as const;

  constructor(private readonly repository: SyncLogRepository) {}

  async status() {
    const data = await Promise.all(
      SyncMonitoringService.ENTITIES.map(async (entity) => {
        const latest = await this.repository.latestSuccess(entity);

        return {
          entity,
          status: latest?.status ?? 'NEVER_RUN',
          lastSync: latest?.finishedAt ?? null,
          startedAt: latest?.startedAt ?? null,
          duration: latest?.duration ?? null,
          totalRecords: latest?.totalRecords ?? 0,
          message: latest?.message ?? null,
        };
      }),
    );

    return {
      success: true,
      message: 'Synchronization status retrieved successfully.',
      data,
    };
  }

  async running() {
    const running = await Promise.all(
      SyncMonitoringService.ENTITIES.map(async (entity) => {
        const latest = await this.repository.latestRunning(entity);

        if (!latest) {
          return null;
        }

        return {
          entity,
          startedAt: latest.startedAt,
          status: latest.status,
        };
      }),
    );

    const data = running.filter(
      (item): item is NonNullable<typeof item> => item !== null,
    );

    return {
      success: true,
      message: 'Running synchronization jobs retrieved successfully.',
      data,
    };
  }

  async history(entity: string | undefined, query: SyncHistoryQueryDto) {
    if (
      entity &&
      !SyncMonitoringService.ENTITIES.includes(
        entity as (typeof SyncMonitoringService.ENTITIES)[number],
      )
    ) {
      throw new BadRequestException(
        `Unsupported synchronization entity: ${entity}`,
      );
    }

    const limit = query.limit ?? 20;
    const offset = query.offset ?? 0;

    const result = entity
      ? await this.repository.findByEntity(entity, limit, offset)
      : await this.repository.findAll(limit, offset);

    const page = Math.floor(offset / limit) + 1;

    const hasMore = offset + result.data.length < result.total;

    const data = result.data.map((item) => ({
      id: item.id,
      entity: item.entity,
      operation: item.operation,
      status: item.status,
      totalRecords: item.totalRecords,
      duration: item.duration,
      message: item.message,
      startedAt: item.startedAt,
      finishedAt: item.finishedAt,
    }));

    return {
      success: true,
      message: 'Synchronization history retrieved successfully.',
      data,
      meta: {
        total: result.total,
        limit,
        offset,
        page,
        hasMore,
      },
    };
  }
}
