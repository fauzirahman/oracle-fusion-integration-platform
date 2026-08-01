import { Injectable, Logger } from '@nestjs/common';

import { CircuitState } from './circuit-state.enum';
import { CircuitOptions } from './circuit-options.interface';

@Injectable()
export class CircuitBreakerService {
  private readonly logger = new Logger(CircuitBreakerService.name);

  private state = CircuitState.CLOSED;

  private failures = 0;

  private openedAt?: number;

  async execute<T>(
    callback: () => Promise<T>,
    options: CircuitOptions = {},
  ): Promise<T> {
    const threshold = options.failureThreshold ?? 5;
    const timeout = options.resetTimeout ?? 30000;

    if (this.state === CircuitState.OPEN) {
      const elapsed = Date.now() - (this.openedAt ?? 0);

      if (elapsed < timeout) {
        throw new Error('Oracle circuit is OPEN');
      }

      this.state = CircuitState.HALF_OPEN;

      this.logger.warn('Circuit switched to HALF_OPEN');
    }

    try {
      const result = await callback();

      this.onSuccess();

      return result;
    } catch (error) {
      this.onFailure(threshold);

      throw error;
    }
  }

  getState(): CircuitState {
    return this.state;
  }

  private onSuccess(): void {
    this.failures = 0;

    if (this.state !== CircuitState.CLOSED) {
      this.logger.log('Circuit CLOSED');
    }

    this.state = CircuitState.CLOSED;
  }

  private onFailure(threshold: number): void {
    this.failures++;

    if (this.failures >= threshold) {
      this.state = CircuitState.OPEN;
      this.openedAt = Date.now();

      this.logger.error(`Circuit OPEN after ${this.failures} failures`);
    }
  }
}
