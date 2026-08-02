import { Injectable } from '@nestjs/common';

import { BaseOracleProvider } from './base-oracle.provider';
import { OracleClientService } from '../client/oracle-client.service';
import { OraclePaginationService } from '../pagination/oracle-pagination.service';

import {
  OracleEmployeeCollectionDto,
  OracleEmployeeDto,
} from '../dto/oracle-employee.dto';

import { OracleFilterBuilder } from '../query/oracle-filter.builder';

@Injectable()
export class OracleEmployeeProvider extends BaseOracleProvider<
  OracleEmployeeCollectionDto,
  OracleEmployeeDto
> {
  protected readonly resource = '/hcmRestApi/resources/latest/workers';

  constructor(
    client: OracleClientService,
    pagination: OraclePaginationService,
  ) {
    super(client, pagination);
  }

  async findByDepartment(
    department: string,
  ): Promise<OracleEmployeeCollectionDto> {
    const filter = OracleFilterBuilder.equals('DepartmentName', department);

    return this.search(filter);
  }

  async findByPersonNumber(
    personNumber: string,
  ): Promise<OracleEmployeeCollectionDto> {
    const filter = OracleFilterBuilder.equals('PersonNumber', personNumber);

    return this.search(filter, {
      limit: 1,
    });
  }
}
