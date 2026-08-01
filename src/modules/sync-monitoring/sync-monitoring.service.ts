import { Injectable } from '@nestjs/common';

import { SyncLogRepository } from '../sync/repositories/sync-log.repository';

@Injectable()
export class SyncMonitoringService {
  private static readonly ENTITIES = [
    'Employee',
    'Department',
    'Supplier',
  ] as const;

  constructor(private readonly repository: SyncLogRepository) {}

  async history(entity?: string) {
    if (entity) {
      return this.repository.findByEntity(entity);
    }

    return this.repository.findAll();
  }

  async status() {
    return Promise.all(
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

    return running.filter(Boolean);
  }
}
