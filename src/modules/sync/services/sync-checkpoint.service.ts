import { Injectable } from '@nestjs/common';

import { SyncCheckpointRepository } from '../repositories/sync-checkpoint.repository';

@Injectable()
export class SyncCheckpointService {
  constructor(private readonly repository: SyncCheckpointRepository) {}

  async getCheckpoint(jobName: string): Promise<Date | null> {
    return this.repository.getLastSync(jobName);
  }

  async updateCheckpoint(jobName: string): Promise<void> {
    await this.repository.save(jobName, new Date());
  }

  async resetCheckpoint(jobName: string): Promise<void> {
    await this.repository.reset(jobName);
  }

  async resetAll(): Promise<void> {
    await this.repository.resetAll();
  }

  async isFirstSync(jobName: string): Promise<boolean> {
    const checkpoint = await this.getCheckpoint(jobName);

    return checkpoint === null;
  }
}
