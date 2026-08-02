import { Injectable } from '@nestjs/common';

import { PrismaService } from '../../../database/prisma.service';

@Injectable()
export class SyncCheckpointRepository {
  constructor(private readonly prisma: PrismaService) {}

  async find(jobName: string) {
    return this.prisma.syncCheckpoint.findUnique({
      where: {
        jobName,
      },
    });
  }

  async getLastSync(jobName: string): Promise<Date | null> {
    const checkpoint = await this.prisma.syncCheckpoint.findUnique({
      where: {
        jobName,
      },
    });

    return checkpoint?.lastSyncAt ?? null;
  }

  async save(jobName: string, lastSyncAt: Date) {
    return this.prisma.syncCheckpoint.upsert({
      where: {
        jobName,
      },

      create: {
        jobName,
        lastSyncAt,
      },

      update: {
        lastSyncAt,
      },
    });
  }

  async reset(jobName: string) {
    await this.prisma.syncCheckpoint.deleteMany({
      where: {
        jobName,
      },
    });
  }

  async resetAll() {
    await this.prisma.syncCheckpoint.deleteMany();
  }
}
