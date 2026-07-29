import { Injectable } from '@nestjs/common';

import { OracleClientService } from '../../oracle/client/oracle-client.service';
import { OracleEndpoints } from '../../oracle/constants/oracle-endpoints';
import { OracleCollection } from '../../oracle/interfaces/oracle-collection.interface';
import { OracleQueryBuilder } from 'src/modules/oracle/builders/oracle-query.builder';
import { OracleDepartmentDto } from 'src/modules/oracle/dto/oracle-department.dto';

@Injectable()
export class OracleDepartmentProvider {
  constructor(private readonly oracleClient: OracleClientService) {}

  async findAll(): Promise<OracleDepartmentDto[]> {
    const query = new OracleQueryBuilder()
      .onlyData()
      .limit(500)
      .totalResults()
      .build();

    const response = await this.oracleClient.get<
      OracleCollection<OracleDepartmentDto>
    >(OracleEndpoints.DEPARTMENTS + query);

    return response.items;
  }
}
