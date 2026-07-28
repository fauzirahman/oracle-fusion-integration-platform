export interface OraclePaginationResponse<T> {
  items: T[];
  count: number;
  hasMore: boolean;
  limit: number;
  offset: number;
}
