import { Injectable } from '@nestjs/common';

import { BaseOracleProvider } from './base-oracle.provider';
import { OracleClientService } from '../client/oracle-client.service';
import { OraclePaginationService } from '../pagination/oracle-pagination.service';

import {
  OracleEmployeeCollectionDto,
  OracleEmployeeDto,
} from '../dto/oracle-employee.dto';

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
    return this.search(`DepartmentName='${department}'`);
  }

  async findByPersonNumber(
    personNumber: string,
  ): Promise<OracleEmployeeCollectionDto> {
    return this.search(`PersonNumber='${personNumber}'`, {
      limit: 1,
    });
  }
}
