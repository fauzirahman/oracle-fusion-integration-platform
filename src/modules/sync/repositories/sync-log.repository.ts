import { Injectable } from '@nestjs/common';
import { SyncLog, SyncStatus } from '@prisma/client';

import { PrismaService } from '../../../database/prisma.service';

@Injectable()
export class SyncLogRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createStart(entity: string, operation: string): Promise<SyncLog> {
    return this.prisma.syncLog.create({
      data: {
        entity,
        operation,
        status: SyncStatus.RUNNING,
        startedAt: new Date(),
      },
    });
  }

  async finishSuccess(
    id: string,
    summary: {
      total: number;
      duration: number;
      message?: string;
    },
  ): Promise<SyncLog> {
    return this.prisma.syncLog.update({
      where: {
        id,
      },
      data: {
        status: SyncStatus.SUCCESS,
        totalRecords: summary.total,
        duration: summary.duration,
        message: summary.message,
        finishedAt: new Date(),
      },
    });
  }

  async finishFailed(id: string, error: string): Promise<SyncLog> {
    return this.prisma.syncLog.update({
      where: {
        id,
      },
      data: {
        status: SyncStatus.FAILED,
        message: error,
        finishedAt: new Date(),
      },
    });
  }

  async latestSuccess(entity: string): Promise<SyncLog | null> {
    return this.prisma.syncLog.findFirst({
      where: {
        entity,
        status: SyncStatus.SUCCESS,
      },
      orderBy: [
        {
          finishedAt: 'desc',
        },
        {
          startedAt: 'desc',
        },
      ],
    });
  }

  async latestRunning(entity: string): Promise<SyncLog | null> {
    return this.prisma.syncLog.findFirst({
      where: {
        entity,
        status: SyncStatus.RUNNING,
      },
      orderBy: {
        startedAt: 'desc',
      },
    });
  }

  async findByEntity(
    entity: string,
    limit = 20,
    offset = 0,
  ): Promise<{
    data: SyncLog[];
    total: number;
  }> {
    const where = {
      entity,
    };

    const [data, total] = await this.prisma.$transaction([
      this.prisma.syncLog.findMany({
        where,
        orderBy: {
          startedAt: 'desc',
        },
        take: limit,
        skip: offset,
      }),

      this.prisma.syncLog.count({
        where,
      }),
    ]);

    return {
      data,
      total,
    };
  }

  async findAll(
    limit = 20,
    offset = 0,
  ): Promise<{
    data: SyncLog[];
    total: number;
  }> {
    const [data, total] = await this.prisma.$transaction([
      this.prisma.syncLog.findMany({
        orderBy: {
          startedAt: 'desc',
        },
        take: limit,
        skip: offset,
      }),

      this.prisma.syncLog.count(),
    ]);

    return {
      data,
      total,
    };
  }
}
