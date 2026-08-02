import { Injectable } from '@nestjs/common';
import { OracleCollection } from '../interfaces/oracle-collection.interface';

@Injectable()
export class OraclePaginationHelper {
  nextOffset<T>(response: OracleCollection<T>): number | null {
    if (!response.hasMore) {
      return null;
    }

    return response.offset + response.limit;
  }
}
