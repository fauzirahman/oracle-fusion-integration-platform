import { Injectable } from '@nestjs/common';
import { OracleClientService } from '../client/oracle-client.service';
import { OracleCollection } from '../interfaces/oracle-collection.interface';

@Injectable()
export class OraclePaginationService {
  constructor(private readonly client: OracleClientService) {}

  async getAll<T>(endpoint: string, limit = 100): Promise<T[]> {
    let offset = 0;

    let results: T[] = [];

    let hasMore = true;

    while (hasMore) {
      const url = `${endpoint}?limit=${limit}&offset=${offset}`;

      const response = await this.client.get<OracleCollection<T>>(url);

      results = [...results, ...response.items];

      hasMore = response.hasMore ?? false;

      offset += limit;
    }

    return results;
  }
}
