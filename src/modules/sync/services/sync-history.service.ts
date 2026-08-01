import { Injectable } from '@nestjs/common';

import { PrismaService } from '../../../database/prisma.service';
import { SyncStatus } from '@prisma/client';
import { SyncSummaryDto } from '../dto/sync-summary.dto';
import { SyncJob } from '../constants/sync-job.enum';

@Injectable()
export class SyncHistoryService {
  constructor(private readonly prisma: PrismaService) {}

  async success(job: SyncJob, startedAt: Date, summary: SyncSummaryDto) {
    return this.prisma.syncHistory.create({
      data: {
        jobName: job,

        startedAt,

        finishedAt: new Date(),

        status: SyncStatus.SUCCESS,

        total: summary.total,

        inserted: summary.inserted,

        updated: summary.updated,

        failed: summary.failed,
      },
    });
  }

  async failed(
    job: SyncJob,
    startedAt: Date,
    error: unknown,
    summary?: Partial<SyncSummaryDto>,
  ) {
    return this.prisma.syncHistory.create({
      data: {
        jobName: job,

        startedAt,

        finishedAt: new Date(),

        status: SyncStatus.FAILED,

        total: summary?.total ?? 0,

        inserted: summary?.inserted ?? 0,

        updated: summary?.updated ?? 0,

        failed: summary?.failed ?? 1,

        errorMessage: error instanceof Error ? error.message : String(error),
      },
    });
  }
}
