import { Global, Module } from '@nestjs/common';

import { GenericSyncProcessor } from './sync/generic-sync.processor';
import { ParallelBatchProcessor } from './sync/parallel-batch.processor';
import { BatchProcessor } from '../modules/sync/batch/batch-processor';
import { RetryPolicyService } from './retry/retry-policy.service';
import { CircuitBreakerService } from './resilience/circuit-breaker.service';

@Global()
@Module({
  providers: [
    BatchProcessor,
    ParallelBatchProcessor,
    GenericSyncProcessor,
    RetryPolicyService,
    CircuitBreakerService,
  ],
  exports: [
    BatchProcessor,
    ParallelBatchProcessor,
    GenericSyncProcessor,
    RetryPolicyService,
    CircuitBreakerService,
  ],
})
export class CommonModule {}