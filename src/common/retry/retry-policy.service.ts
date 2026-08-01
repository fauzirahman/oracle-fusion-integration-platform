import { Injectable, Logger } from '@nestjs/common';

import { RetryOptions } from './retry-options.interface';
import { DEFAULT_RETRY_OPTIONS } from './retry.constants';

@Injectable()
export class RetryPolicyService {
  private readonly logger = new Logger(RetryPolicyService.name);

  async execute<T>(
    callback: () => Promise<T>,
    options: RetryOptions,
  ): Promise<T> {
    const config = {
      ...DEFAULT_RETRY_OPTIONS,
      ...options,
    };

    let attempt = 0;

    while (true) {
      try {
        attempt++;

        return await callback();
      } catch (error) {
        if (attempt >= config.maxAttempts || !config.shouldRetry(error)) {
          throw error;
        }

        const delay = Math.min(
          config.initialDelay * Math.pow(config.factor, attempt - 1),
          config.maxDelay,
        );

        this.logger.warn(
          `Retry ${attempt}/${config.maxAttempts} after ${delay} ms`,
        );

        await this.sleep(delay);
      }
    }
  }

  private sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
