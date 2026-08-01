import { Injectable } from '@nestjs/common';

import { OracleCollection } from '../interfaces/oracle-collection.interface';

export interface PaginationOptions {
  /**
   * Jumlah record yang diambil setiap request ke Oracle.
   */
  pageSize?: number;

  /**
   * Maksimum record yang akan dikumpulkan.
   */
  maxRecords?: number;
}

@Injectable()
export class OraclePaginationService {
  async fetchAll<T>(
    loader: (limit: number, offset: number) => Promise<OracleCollection<T>>,
    options: PaginationOptions = {},
  ): Promise<T[]> {
    const pageSize = options.pageSize ?? 500;
    const maxRecords = options.maxRecords ?? Number.MAX_SAFE_INTEGER;

    const results: T[] = [];

    let offset = 0;
    let hasMore = true;

    while (hasMore && results.length < maxRecords) {
      const response = await loader(pageSize, offset);

      const items = response.items ?? [];

      results.push(...items);

      offset += items.length;

      hasMore =
        response.hasMore === true &&
        items.length > 0 &&
        results.length < maxRecords;
    }

    return results.slice(0, maxRecords);
  }

  /**
   * Backward compatibility
   * Untuk provider yang masih menggunakan API collect()
   */
  async collect<T>(
    loader: (limit: number, offset: number) => Promise<OracleCollection<T>>,
    options: PaginationOptions = {},
  ): Promise<T[]> {
    return this.fetchAll(loader, options);
  }
}
