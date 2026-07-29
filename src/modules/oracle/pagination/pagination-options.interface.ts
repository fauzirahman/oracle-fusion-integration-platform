export interface PaginationOptions {
  path: string;

  limit?: number;

  offset?: number;

  query?: Record<string, any>;
}
