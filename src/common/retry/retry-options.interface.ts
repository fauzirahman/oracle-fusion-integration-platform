export interface RetryOptions {
  maxAttempts?: number;

  initialDelay?: number;

  maxDelay?: number;

  factor?: number;

  shouldRetry(error: unknown): boolean;
}
