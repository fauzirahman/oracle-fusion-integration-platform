import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class SyncService {
  private readonly logger = new Logger(SyncService.name);

  async startEmployeeSync() {
    this.logger.log('Employee synchronization started');

    /**
     * Flow:
     *
     * 1. Get employee from Oracle
     * 2. Transform data
     * 3. Save to PostgreSQL
     *
     */

    this.logger.log('Employee synchronization finished');
  }
}
