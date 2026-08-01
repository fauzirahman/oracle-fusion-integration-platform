import { Injectable } from '@nestjs/common';

import { PrismaService } from '../../../database/prisma.service';
import { SyncJob } from '../constants/sync-job.enum';

@Injectable()
export class SyncCheckpointService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Get last synchronization timestamp.
   * Returns Unix epoch when no checkpoint exists.
   */
  async getLastSync(job: SyncJob): Promise<Date> {
    const checkpoint = await this.prisma.syncCheckpoint.findUnique({
      where: {
        jobName: job,
      },
    });

    return checkpoint?.lastSyncAt ?? new Date(0);
  }

  /**
   * Save current synchronization timestamp.
   */
  async updateLastSync(job: SyncJob, timestamp = new Date()): Promise<void> {
    await this.prisma.syncCheckpoint.upsert({
      where: {
        jobName: job,
      },
      create: {
        jobName: job,
        lastSyncAt: timestamp,
      },
      update: {
        lastSyncAt: timestamp,
      },
    });
  }

  /**
   * Reset checkpoint.
   */
  async reset(job: SyncJob): Promise<void> {
    await this.prisma.syncCheckpoint.deleteMany({
      where: {
        jobName: job,
      },
    });
  }
}
