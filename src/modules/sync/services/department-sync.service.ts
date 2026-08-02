import { Injectable } from '@nestjs/common';

import { GenericSyncProcessor } from '../../../common/sync/generic-sync.processor';

import { DepartmentMapper } from '../../departments/mappers/department.mapper';
import { OracleDepartmentProvider } from '../../departments/providers/oracle-department.provider';
import { DepartmentRepository } from '../../departments/repositories/department.repository';

import { SyncSummaryDto } from '../dto/sync-summary.dto';
import { SyncEngineService } from './sync-engine.service';

@Injectable()
export class DepartmentSyncService {
  constructor(
    private readonly oracleDepartmentProvider: OracleDepartmentProvider,
    private readonly repository: DepartmentRepository,
    private readonly processor: GenericSyncProcessor,
    private readonly syncEngine: SyncEngineService,
  ) {}

  async sync(): Promise<SyncSummaryDto> {
    return this.syncEngine.run(
      {
        entity: 'Department',
        operation: 'FULL',
      },
      async () => {
        const departments = await this.oracleDepartmentProvider.findAll();

        return this.processor.execute({
          items: departments,
          repository: this.repository,
          mapper: DepartmentMapper.toEntity,
          getOracleId: (department) => String(department.OrganizationId),
        });
      },
    );
  }
}
