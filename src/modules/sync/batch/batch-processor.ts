export interface BatchProcessorOptions<T> {
  batchSize?: number;

  concurrency?: number;

  failFast?: boolean;

  onBatchStart?: (batchNumber: number, batch: T[]) => Promise<void> | void;

  onBatchComplete?: (batchNumber: number, batch: T[]) => Promise<void> | void;

  onError?: (error: unknown, item: T) => Promise<void> | void;
}

export interface BatchProcessorResult {
  totalItems: number;

  totalBatches: number;

  processed: number;

  succeeded: number;

  failed: number;
}

export class BatchProcessor {
  static split<T>(items: T[], batchSize = 100): T[][] {
    if (batchSize <= 0) {
      throw new Error('batchSize must be greater than zero');
    }

    const batches: T[][] = [];

    for (let i = 0; i < items.length; i += batchSize) {
      batches.push(items.slice(i, i + batchSize));
    }

    return batches;
  }

  static async process<T>(
    items: T[],
    processor: (item: T) => Promise<void>,
    options: BatchProcessorOptions<T> = {},
  ): Promise<BatchProcessorResult> {
    const batchSize = options.batchSize ?? 100;
    const concurrency = Math.max(1, options.concurrency ?? 1);

    const batches = this.split(items, batchSize);

    const result: BatchProcessorResult = {
      totalItems: items.length,
      totalBatches: batches.length,
      processed: 0,
      succeeded: 0,
      failed: 0,
    };

    for (let batchIndex = 0; batchIndex < batches.length; batchIndex++) {
      const batch = batches[batchIndex];

      await options.onBatchStart?.(batchIndex + 1, batch);

      for (let i = 0; i < batch.length; i += concurrency) {
        const chunk = batch.slice(i, i + concurrency);

        await Promise.all(
          chunk.map(async (item) => {
            try {
              await processor(item);

              result.succeeded++;
            } catch (error) {
              result.failed++;

              await options.onError?.(error, item);

              if (options.failFast) {
                throw error;
              }
            } finally {
              result.processed++;
            }
          }),
        );
      }

      await options.onBatchComplete?.(batchIndex + 1, batch);
    }

    return result;
  }
}
