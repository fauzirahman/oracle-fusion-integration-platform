import { Injectable } from '@nestjs/common';

import { OracleClientService } from '../../oracle/client/oracle-client.service';
import { OracleEndpoints } from '../../oracle/constants/oracle-endpoints';
import { OracleSupplierDto } from '../../oracle/dto/oracle-supplier.dto';
import { OracleCollection } from '../../oracle/interfaces/oracle-collection.interface';
import { OracleQueryBuilder } from '../../oracle/builders/oracle-query.builder';

@Injectable()
export class OracleSupplierProvider {
  constructor(private readonly oracleClient: OracleClientService) {}

  async findAll(options?: {
    limit?: number;
    offset?: number;
  }): Promise<OracleSupplierDto[]> {
    const query = new OracleQueryBuilder()
      .onlyData()
      .limit(options?.limit ?? 500)
      .offset(options?.offset ?? 0)
      .build();

    const response = await this.oracleClient.get<
      OracleCollection<OracleSupplierDto>
    >(OracleEndpoints.SUPPLIERS + query);

    return response.items ?? [];
  }

  /**
   * Backward compatibility.
   * SupplierSyncService lama masih memanggil find().
   */
  async find(options?: {
    limit?: number;
    offset?: number;
  }): Promise<OracleCollection<OracleSupplierDto>> {
    const items = await this.findAll(options);

    return {
      items,
      count: items.length,
      hasMore: false,
      limit: options?.limit ?? items.length,
      offset: options?.offset ?? 0,
    };
  }
}
