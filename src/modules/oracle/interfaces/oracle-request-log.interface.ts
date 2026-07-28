export interface OracleRequestLog {
  method: string;
  url: string;
  statusCode?: number;
  duration: number;
  requestId?: string;
  payload?: unknown;
  response?: unknown;
  error?: unknown;
}
