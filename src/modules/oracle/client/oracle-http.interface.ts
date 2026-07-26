export interface OracleResponse<T = unknown> {
  data: T;
  status: number;
  headers: Record<string, string>;
}

export interface OracleError {
  status: number;
  message: string;
  detail?: string;
}
