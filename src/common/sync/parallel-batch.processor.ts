import { Injectable } from '@nestjs/common';

export interface ParallelBatchOptions<T> {
  items: T[];

  batchSize?: number;

  concurrency?: number;

  handler(item: T): Promise<void>;
}

@Injectable()
export class ParallelBatchProcessor {
  async process<T>(options: ParallelBatchOptions<T>): Promise<void> {
    const batchSize = options.batchSize ?? 100;
    const concurrency = options.concurrency ?? 5;

    const batches: T[][] = [];

    for (let i = 0; i < options.items.length; i += batchSize) {
      batches.push(options.items.slice(i, i + batchSize));
    }

    for (let i = 0; i < batches.length; i += concurrency) {
      const workers = batches.slice(i, i + concurrency).map(async (batch) => {
        for (const item of batch) {
          await options.handler(item);
        }
      });

      await Promise.all(workers);
    }
  }
}
