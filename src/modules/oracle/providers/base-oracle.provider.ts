import { OracleClientService } from '../client/oracle-client.service';
import { OraclePaginationService } from '../pagination/oracle-pagination.service';
import { OracleQueryBuilder } from '../builders/oracle-query.builder';

export abstract class BaseOracleProvider<TCollection, TItem> {
  protected abstract readonly resource: string;

  constructor(
    protected readonly client: OracleClientService,
    protected readonly pagination: OraclePaginationService,
  ) {}

  async find(options?: {
    limit?: number;
    offset?: number;
  }): Promise<TCollection> {
    const query = new OracleQueryBuilder()
      .onlyData()
      .limit(options?.limit ?? 500)
      .offset(options?.offset ?? 0)
      .build();

    return this.client.get<TCollection>(`${this.resource}${query}`);
  }

  async findById(id: string | number): Promise<TItem> {
    return this.client.get<TItem>(`${this.resource}/${id}`);
  }

  async search(
    expression: string,
    options?: {
      limit?: number;
      offset?: number;
    },
  ): Promise<TCollection> {
    const query = new OracleQueryBuilder()
      .onlyData()
      .where(expression)
      .limit(options?.limit ?? 500)
      .offset(options?.offset ?? 0)
      .build();

    return this.client.get<TCollection>(`${this.resource}${query}`);
  }

  async findUpdatedSince(
    date: Date,
    options?: {
      limit?: number;
      offset?: number;
    },
  ): Promise<TCollection> {
    return this.search(`LastUpdateDate > '${date.toISOString()}'`, options);
  }

  async findAll(): Promise<TItem[]> {
    return this.pagination.collect<TItem>(
      (limit, offset) =>
        this.find({
          limit,
          offset,
        }) as Promise<any>,
      {
        pageSize: 500,
      },
    );
  }
}
