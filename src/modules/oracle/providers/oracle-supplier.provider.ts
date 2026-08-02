import { Injectable } from '@nestjs/common';

import { BaseOracleProvider } from './base-oracle.provider';
import { OracleClientService } from '../client/oracle-client.service';
import { OraclePaginationService } from '../pagination/oracle-pagination.service';
import { OracleFilterBuilder } from '../query/oracle-filter.builder';

import {
  OracleSupplierCollectionDto,
  OracleSupplierDto,
} from '../dto/oracle-supplier.dto';

@Injectable()
export class OracleSupplierProvider extends BaseOracleProvider<
  OracleSupplierCollectionDto,
  OracleSupplierDto
> {
  protected readonly resource = '/fscmRestApi/resources/latest/suppliers';

  constructor(
    client: OracleClientService,
    pagination: OraclePaginationService,
  ) {
    super(client, pagination);
  }

  async findBySupplierNumber(
    supplierNumber: string,
  ): Promise<OracleSupplierCollectionDto> {
    const filter = OracleFilterBuilder.equals('SupplierNumber', supplierNumber);

    return this.search(filter, {
      limit: 1,
    });
  }

  async findByStatus(status: string): Promise<OracleSupplierCollectionDto> {
    const filter = OracleFilterBuilder.equals('Status', status);

    return this.search(filter);
  }

  async findBySupplierName(
    supplierName: string,
  ): Promise<OracleSupplierCollectionDto> {
    const filter = OracleFilterBuilder.contains('Supplier', supplierName);

    return this.search(filter);
  }

  async findActive(): Promise<OracleSupplierCollectionDto> {
    return this.findByStatus('ACTIVE');
  }
}
