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
      orderBy: {
        finishedAt: 'desc',
      },
    });
  }

  async latestRunning(entity: string): Promise<SyncLog | null> {
    return this.prisma.syncLog.findFirst({
      where: {
        entity,
        status: SyncStatus.RUNNING,
      },
    });
  }

  /**
   * History by entity.
   */
  async history(entity: string, take = 20): Promise<SyncLog[]> {
    return this.prisma.syncLog.findMany({
      where: {
        entity,
      },
      orderBy: {
        startedAt: 'desc',
      },
      take,
    });
  }

  /**
   * Global history.
   */
  async findAll(take = 100): Promise<SyncLog[]> {
    return this.prisma.syncLog.findMany({
      orderBy: {
        startedAt: 'desc',
      },
      take,
    });
  }

  /**
   * Alias for monitoring service.
   */
  async findByEntity(entity: string, take = 20): Promise<SyncLog[]> {
    return this.prisma.syncLog.findMany({
      where: {
        entity,
      },
      orderBy: {
        startedAt: 'desc',
      },
      take,
    });
  }
}
