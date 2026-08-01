import { Injectable } from '@nestjs/common';

import { GenericSyncProcessor } from '../../../common/sync/generic-sync.processor';

import { EmployeeMapper } from '../../employees/mappers/employee.mapper';
import { EmployeeRepository } from '../../employees/repositories/employee.repository';
import { OracleEmployeeProvider } from '../../oracle/providers/oracle-employee.provider';

import { SyncSummaryDto } from '../dto/sync-summary.dto';
import { SyncEngineService } from './sync-engine.service';
import { SyncLogRepository } from '../repositories/sync-log.repository';

@Injectable()
export class EmployeeSyncService {
  constructor(
    private readonly oracleEmployeeProvider: OracleEmployeeProvider,
    private readonly employeeRepository: EmployeeRepository,
    private readonly processor: GenericSyncProcessor,
    private readonly syncEngine: SyncEngineService,
    private readonly syncLogRepository: SyncLogRepository,
  ) {}

  async sync(): Promise<SyncSummaryDto> {
    return this.syncEngine.run(
      {
        entity: 'Employee',
        operation: 'INCREMENTAL',
      },
      async () => {
        const latestSync =
          await this.syncLogRepository.latestSuccess('Employee');

        let response;

        if (latestSync?.finishedAt) {
          response = await this.oracleEmployeeProvider.findUpdatedSince(
            latestSync.finishedAt,
            {
              limit: 500,
            },
          );
        } else {
          response = await this.oracleEmployeeProvider.find({
            limit: 500,
          });
        }

        return this.processor.execute({
          items: response.items ?? [],
          repository: this.employeeRepository,
          mapper: EmployeeMapper.toEntity,
          getOracleId: (employee) => String(employee.PersonId),
        });
      },
    );
  }
}
