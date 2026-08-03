export interface OracleSupplierDto {
  /**
   * Oracle Supplier ID
   */
  SupplierId: number;

  /**
   * Supplier Number
   */
  SupplierNumber?: string;

  /**
   * Supplier Name (Oracle Fusion)
   */
  SupplierName: string;

  /**
   * Legacy field untuk kompatibilitas mock lama.
   * Dapat dihapus setelah seluruh mock menggunakan SupplierName.
   */
  Supplier?: string;

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
