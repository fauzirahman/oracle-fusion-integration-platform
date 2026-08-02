import type { OracleSupplierCollectionDto } from '../../oracle/dto/oracle-supplier.dto';

export interface SupplierProvider {
  findAll(
    options?: Record<string, unknown>,
  ): Promise<OracleSupplierCollectionDto>;

  findBySupplierNumber(
    supplierNumber: string,
  ): Promise<OracleSupplierCollectionDto>;

  findBySupplierName(
    supplierName: string,
  ): Promise<OracleSupplierCollectionDto>;

  findByStatus(status: string): Promise<OracleSupplierCollectionDto>;
}
