import { OracleLink } from './oracle-link.interface';

export interface OracleCollection<T> {
  items: T[];
  count: number;
  hasMore: boolean;
  limit: number;
  offset: number;
  links?: OracleLink[];
  totalResults?: number;
}
