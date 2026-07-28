import { Injectable } from '@nestjs/common';

import { EmployeeQueryDto } from '../../employees/dto/employee-query.dto';
import { EmployeeProvider } from '../../employees/interfaces/employee-provider.interface';

import { OracleQueryBuilder } from '../builders/oracle-query.builder';
import { OracleClientService } from '../client/oracle-client.service';
import { OracleEmployeeDto } from '../dto/oracle-employee.dto';
import { OracleCollection } from '../interfaces/oracle-collection.interface';
import { OracleEndpoints } from '../constants/oracle-endpoints';

@Injectable()
export class OracleEmployeeService implements EmployeeProvider {
  constructor(
    private readonly client: OracleClientService,
  ) {}

  async find(
    query: EmployeeQueryDto = {},
  ): Promise<OracleCollection<OracleEmployeeDto>> {
    const builder = new OracleQueryBuilder();

    builder.onlyData();

    if (query.limit !== undefined) {
      builder.limit(query.limit);
    }

    if (query.offset !== undefined) {
      builder.offset(query.offset);
    }

    if (query.fields?.length) {
      builder.fields(...query.fields);
    }

    if (query.expand?.length) {
      builder.expand(...query.expand);
    }

    if (query.personNumber) {
      builder.where(
        'PersonNumber',
        query.personNumber,
      );
    }

    if (query.email) {
      builder.where(
        'WorkEmail',
        query.email,
      );
    }

    const oracleQuery = builder.build();

    return this.client.get<OracleCollection<OracleEmployeeDto>>(
      OracleEndpoints.WORKERS + oracleQuery,
    );
  }

  async findByPersonNumber(
    personNumber: string,
  ): Promise<OracleEmployeeDto | null> {
    const response = await this.find({
      personNumber,
      limit: 1,
    });

    return response.items[0] ?? null;
  }
}