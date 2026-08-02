export interface OracleSupplierDto {
  SupplierId: number;

  SupplierNumber: string;

  /**
   * Supplier Name
   */
  Supplier: string;

  TaxpayerId?: string;

  EmailAddress?: string;

  Phone?: string;

  Status?: string;

  CreationDate?: string;

  LastUpdateDate?: string;
}

export interface OracleSupplierCollectionDto {
  items: OracleSupplierDto[];

  count?: number;

  hasMore?: boolean;

  limit?: number;

  offset?: number;

  links?: unknown[];
}