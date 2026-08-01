import { Injectable } from '@nestjs/common';

import { SyncSummaryDto } from '../dto/sync-summary.dto';
import { SyncLogRepository } from '../repositories/sync-log.repository';

@Injectable()
export class SyncLogService {
  constructor(private readonly repository: SyncLogRepository) {}

  async start(entity: string, operation: string) {
    return this.repository.createStart(entity, operation);
  }

  async success(
    id: string,
    summary: SyncSummaryDto,
    startedAt: Date,
    message?: string,
  ) {
    return this.repository.finishSuccess(id, {
      total: summary.total,
      duration: Date.now() - startedAt.getTime(),
      message,
    });
  }

  async failed(id: string, startedAt: Date, error: Error) {
    return this.repository.finishFailed(id, error.message);
  }
}
