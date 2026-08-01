import { SyncSummaryDto } from '../dto/sync-summary.dto';
import { SyncOperation } from '../enums/sync-operation.enum';

export interface SyncJobDefinition<TResponse> {
  entity: string;

  operation: SyncOperation;

  fetch(lastSuccess: Date | null): Promise<TResponse>;

  process(response: TResponse): Promise<SyncSummaryDto>;
}