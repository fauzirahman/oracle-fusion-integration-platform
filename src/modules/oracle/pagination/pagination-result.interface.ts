export interface PaginationResult<T> {
  items: T[];

  count: number;

  hasMore: boolean;

  offset: number;

  limit: number;
}