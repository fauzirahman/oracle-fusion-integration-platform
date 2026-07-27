export interface OracleCollectionResponse<T> {
  count: number;

  hasMore: boolean;

  limit?: number;

  offset?: number;

  links?: {
    rel: string;
    href: string;
    name?: string;
    kind?: string;
  }[];

  items: T[];
}
