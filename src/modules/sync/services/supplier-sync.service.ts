import { Injectable } from '@nestjs/common';

import { GenericSyncProcessor } from '../../../common/sync/generic-sync.processor';

import { SupplierMapper } from '../../suppliers/mappers/supplier.mapper';
import { SupplierRepository } from '../../suppliers/repositories/supplier.repository';
import { OracleSupplierProvider } from '../../suppliers/providers/oracle-supplier.provider';

import { SyncSummaryDto } from '../dto/sync-summary.dto';
import { SyncEngineService } from './sync-engine.service';

@Injectable()
export class SupplierSyncService {
  constructor(
    private readonly oracleSupplierProvider: OracleSupplierProvider,
    private readonly repository: SupplierRepository,
    private readonly processor: GenericSyncProcessor,
    private readonly syncEngine: SyncEngineService,
  ) {}

  async sync(): Promise<SyncSummaryDto> {
    return this.syncEngine.run(
      {
        entity: 'Supplier',
        operation: 'FULL',
      },
      async () => {
        const response = await this.oracleSupplierProvider.find({
          limit: 500,
        });

        return this.processor.execute({
          items: response.items ?? [],
          repository: this.repository,
          mapper: SupplierMapper.toEntity,
          getOracleId: (supplier) => String(supplier.SupplierId),
        });
      },
    );
  }
}
